'use strict';

const script = document.createElement('script');
script.id = 'twitch-enhancer-script';
script.setAttribute('type', 'module');
script.setAttribute('src', chrome.runtime.getURL('js/main.js'));
const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
head.insertBefore(script, head.lasChild);