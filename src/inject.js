const settings = document.createElement('div');
settings.id = 'te-settings';
document.body.appendChild(settings);

const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;

const script = document.createElement('script');
script.src = chrome.runtime.getURL('index.js');

const fa = document.createElement('script');
fa.src = 'https://kit.fontawesome.com/955f06605f.js';
fa.crossOrigin = 'anonymous';

head.appendChild(fa);
head.appendChild(script);
