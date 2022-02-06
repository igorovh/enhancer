'use strict';

(async function () {
    const settings = await new Promise(resolve => {
        chrome.storage.sync.get({
            te_xayo_format: 'hour',
            te_xayo_service: 'auto'
        }, options => {
            resolve(options)
        });
    });
    
    const twitchEnhancer = {
        settings,
        url: chrome.runtime.getURL('%name%')
    }
    
    const head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    
    const settingsScript = document.createElement('script');
    settingsScript.id = 'twitch-enhancer-settings';
    settingsScript.text = `window.twitchEnhancer = ${JSON.stringify(twitchEnhancer)};`; 
    head.insertBefore(settingsScript, head.lasChild);
    
    const script = document.createElement('script');
    script.id = 'twitch-enhancer-script';
    script.setAttribute('type', 'module');
    script.setAttribute('src', chrome.runtime.getURL('js/main.js'));
    head.insertBefore(script, head.lasChild);
})();