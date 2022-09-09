const info = {
    files: {
        url: chrome.runtime.getURL('%path%'),
    },
};

localStorage.setItem('_enhancerInfo', JSON.stringify(info, null, 4));

const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
const dev = __development__;

if (dev) console.info('[TE] [INJECT] Injecting development files...');

const link = document.createElement('link');
link.rel = 'stylesheet';
link.className = 'te-injected';
link.href = dev ? 'http://127.0.0.1:2565/bundle.css' : chrome.runtime.getURL('bundle.css');

head.appendChild(link);
console.info('[TE] [INJECT] Injected bundle.css');

const script = document.createElement('script');
script.className = 'te-injected';
script.src = dev ? 'http://127.0.0.1:2565/index.js' : chrome.runtime.getURL('index.js');

head.appendChild(script);
console.info('[TE] [INJECT] Injected index.js');

// if (dev) {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.className = 'te-injected';
//     link.href = 'http://127.0.0.1:2565/bundle.css';
//     head.appendChild(link);
// }
