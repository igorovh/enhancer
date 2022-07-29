const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
const script = document.createElement('script');
script.src = 'http://127.0.0.1:2565/index.js';
if(head) head.appendChild(script);