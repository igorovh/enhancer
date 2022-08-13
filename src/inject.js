const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;

const script = document.createElement('script');
script.src = chrome.runtime.getURL('index.js');

head.appendChild(script);
