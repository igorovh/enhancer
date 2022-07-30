const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;

const script = document.createElement('script');
script.src = 'http://127.0.0.1:2565/index.js';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'http://127.0.0.1:2565/bundle.css';
link.id = 'te-styles';

head.appendChild(script);
head.appendChild(link);