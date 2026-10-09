import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

type ProtectedRange = {
  top: number;
  bottom: number;
};

const mergeProtectedRanges = (ranges: ProtectedRange[]) => {
  if (ranges.length === 0) {
    return [];
  }

  const sortedRanges = [...ranges].sort((a, b) => a.top - b.top);
  const mergedRanges: ProtectedRange[] = [sortedRanges[0]];

  for (let i = 1; i < sortedRanges.length; i += 1) {
    const current = sortedRanges[i];
    const last = mergedRanges[mergedRanges.length - 1];

    if (current.top <= last.bottom + 1) {
      last.bottom = Math.max(last.bottom, current.bottom);
    } else {
      mergedRanges.push({ ...current });
    }
  }

  return mergedRanges;
};

const collectTextLineRanges = (container: HTMLElement) => {
  const containerRect = container.getBoundingClientRect();
  const ranges: ProtectedRange[] = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);

  let currentNode = walker.nextNode();
  while (currentNode) {
    const textNode = currentNode as Text;
    const textContent = textNode.textContent?.trim();

    if (textContent) {
      const parentElement = textNode.parentElement;
      if (parentElement) {
        const computedStyle = window.getComputedStyle(parentElement);
        if (
          computedStyle.display !== 'none' &&
          computedStyle.visibility !== 'hidden'
        ) {
          const range = document.createRange();
          range.selectNodeContents(textNode);

          Array.from(range.getClientRects()).forEach((rect) => {
            if (rect.width > 0 && rect.height > 0) {
              ranges.push({
                top: rect.top - containerRect.top,
                bottom: rect.bottom - containerRect.top,
              });
            }
          });
        }
      }
    }

    currentNode = walker.nextNode();
  }

  return mergeProtectedRanges(ranges);
};

const collectMarkedBlockRanges = (
  container: HTMLElement,
  selector: string,
) => {
  const containerRect = container.getBoundingClientRect();
  const markedBlocks = Array.from(container.querySelectorAll(selector));

  return markedBlocks
    .map((block) => {
      const rect = (block as HTMLElement).getBoundingClientRect();
      return {
        top: rect.top - containerRect.top,
        bottom: rect.bottom - containerRect.top,
      };
    })
    .filter((range) => range.bottom > range.top);
};

const getSafePageEnd = (
  startY: number,
  targetEnd: number,
  protectedRanges: ProtectedRange[],
) => {
  const tolerance = 1;
  let safeEnd = targetEnd;

  for (let i = 0; i < protectedRanges.length; i += 1) {
    const range = protectedRanges[i];
    const intersectsBreakLine =
      range.top < safeEnd - tolerance && range.bottom > safeEnd + tolerance;

    if (intersectsBreakLine) {
      safeEnd = range.top;
      break;
    }
  }

  // 防止极端情况下回退过多，导致当前页几乎没有内容。
  if (safeEnd - startY < 20) {
    return targetEnd;
  }

  return safeEnd;
};

// iOS Safari / 微信 WKWebView 对单张 canvas 有约 1677 万像素的硬限制，超限会直接渲染成空白，
// 长报告按 2 倍缩放很容易超，这里从 2 开始逐级降，直到满足限制。
const MAX_CANVAS_PIXELS = 16_000_000;
const MAX_CANVAS_WIDTH = 1600;

const getRenderScale = (element: HTMLElement) => {
  const width = element.offsetWidth || element.scrollWidth;
  const height = element.scrollHeight || element.offsetHeight;

  let scale = 2;
  while (scale > 1 && width * height * scale * scale > MAX_CANVAS_PIXELS) {
    scale -= 0.25;
  }

  if (width * scale > MAX_CANVAS_WIDTH) {
    scale = MAX_CANVAS_WIDTH / width;
  }

  return scale;
};

const isWeChat = () => /MicroMessenger/i.test(navigator.userAgent);

/**
 * 尝试用标准 a[download] 方式下载（Chrome / Edge / Firefox / 各厂商手机浏览器）。
 * 返回 true 表示已触发下载；返回 false 表示当前环境不支持（微信内置浏览器），
 * 调用方应改用预览弹窗让用户在中转打开。
 */
export const triggerPdfDownload = (url: string, filename: string): boolean => {
  if (isWeChat()) {
    return false;
  }

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
};

export type PdfExportResult = {
  blob: Blob;
  // 各分页的截图（与嵌入PDF的画面一致），供微信等无法渲染PDF的环境做预览
  pageImages: string[];
};

export const exportPDF = async (elementId: string): Promise<PdfExportResult | null> => {
  const element = document.getElementById(elementId);
  if (!element) return null;

  // 1. 隐藏不需要打印的元素
  const btns = element.querySelectorAll('.pdf-hide');
  const originalDisplays: string[] = [];
  btns.forEach((btn: any, index) => {
    originalDisplays[index] = btn.style.display;
    btn.style.display = 'none';
  });

  const A4_WIDTH = 595.28;
  const A4_HEIGHT = 841.89;

  try {
    // 2. 自适应高清 Canvas（兼顾清晰度与 iOS canvas 像素上限）
    const renderScale = getRenderScale(element);

    const canvas = await html2canvas(element, {
      scale: renderScale,
      useCORS: true,
      backgroundColor: '#ffffff',
      allowTaint: true
    } as any);

    // 3. 计算 DOM 尺寸与 PDF 尺寸的映射关系
    const domWidth = element.offsetWidth;
    const domHeight = canvas.height / renderScale;
    const pdfScale = A4_WIDTH / domWidth;
    const pageHeightDOM = A4_HEIGHT / pdfScale;

    // 4. 默认只保护文字行；另外只对指定模块做整块保护。
    const protectedRanges = mergeProtectedRanges([
      ...collectTextLineRanges(element),
      ...collectMarkedBlockRanges(element, '.pdf-avoid-break-chart'),
      ...collectMarkedBlockRanges(element, '.pdf-avoid-break-tongue-image'),
    ]);

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'a4',
      compress: true
    });

    let startY = 0;
    let isFirstPage = true;
    const pageImages: string[] = [];

    // 5. 动态切割画布，只把分页线回退到文字行顶部，避免大面积空白。
    while (startY < domHeight) {
      const targetY = Math.min(startY + pageHeightDOM, domHeight);
      const safeY =
        targetY >= domHeight
          ? domHeight
          : getSafePageEnd(startY, targetY, protectedRanges);

      if (!isFirstPage) {
        pdf.addPage();
      }
      isFirstPage = false;

      const sliceTopPx = Math.round(startY * renderScale);
      const sliceHeightPx = Math.max(1, Math.round((safeY - startY) * renderScale));
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeightPx;

      const pageContext = pageCanvas.getContext('2d');
      if (!pageContext) {
        break;
      }

      pageContext.drawImage(
        canvas,
        0,
        sliceTopPx,
        canvas.width,
        sliceHeightPx,
        0,
        0,
        canvas.width,
        sliceHeightPx,
      );

      // JPEG 质量 0.85：文字类内容肉眼与 1.0 无差别，但体积能省一半以上
      const pageData = pageCanvas.toDataURL('image/jpeg', 0.85);
      pageImages.push(pageData);
      const pageHeightPDF = (sliceHeightPx / renderScale) * pdfScale;
      pdf.addImage(pageData, 'JPEG', 0, 0, A4_WIDTH, pageHeightPDF);

      startY = safeY;
    }

    return { blob: pdf.output('blob'), pageImages };
  } catch (error) {
    console.error('导出PDF失败', error);
    return null;
  } finally {
    // 6. 恢复被隐藏的元素
    btns.forEach((btn: any, index) => {
      btn.style.display = originalDisplays[index];
    });
  }
};
