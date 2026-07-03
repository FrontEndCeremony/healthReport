import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zhCN from './locales/zh-CN.json';
import zhHK from './locales/zh-HK.json';

const resources = {
  'zh-CN': {
    translation: zhCN,
  },
  'zh-HK': {
    translation: zhHK,
  },
};

// 获取URL参数langue
const urlParams = new URLSearchParams(window.location.search);
const langue = urlParams.get('langue');

// 确定初始语言
let lng = 'zh-CN'; // 默认简体
if (langue === 'HK') {
  lng = 'zh-HK';
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lng,
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false, // react 已经自带防注入
    },
  });

export default i18n;