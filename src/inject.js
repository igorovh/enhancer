const info = {
    files: {
        url: chrome.runtime.getURL('%path%'),
    },
};

localStorage.setItem('_enhancerInfo', JSON.stringify(info, null, 4));

const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
const dev = __development__;

const script = document.createElement('script');
script.className = 'te-injected';
script.src = dev ? 'http://127.0.0.1:2565/index.js' : chrome.runtime.getURL('index.js');

head.appendChild(script);

//TODO Check if this is working
// Link development css

if (dev) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.className = 'te-injected';
    link.href = 'http://127.0.0.1:2565/bundle.css';
    head.appendChild(link);
}
