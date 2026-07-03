import html2canvas from 'html2canvas';

export const exportImage = async (elementId: string): Promise<string | null> => {
  const element = document.getElementById(elementId);
  if (!element) return null;

  // 1. 隐藏不需要打印的元素
  const btns = element.querySelectorAll('.pdf-hide');
  const originalDisplays: string[] = [];
  btns.forEach((btn: any, index) => {
    originalDisplays[index] = btn.style.display;
    btn.style.display = 'none';
  });

  try {
    const renderScale = 2;

    // 2. 生成高清 Canvas
    const canvas = await html2canvas(element, { 
      scale: renderScale, 
      useCORS: true, 
      backgroundColor: '#ffffff',
      allowTaint: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight
    } as any); 
    
    // 3. 将 Canvas 转换为 Base64 图片
    const imgData = canvas.toDataURL('image/jpeg', 0.8); // 适当降低质量，防止生成的图片过大导致手机内存溢出
    return imgData;

  } catch (error) {
    console.error('导出图片失败', error);
    return null;
  } finally {
    // 4. 恢复被隐藏的元素
    btns.forEach((btn: any, index) => {
      btn.style.display = originalDisplays[index];
    });
  }
};
