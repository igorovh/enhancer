'use strict';

(async function () {
    const settings = await new Promise(resolve => {
        chrome.storage.sync.get({
            te_xayo_format: 'hour',
            te_xayo_service: 'auto',
            te_viewer_badges: true,
            te_group_badges: true,
            te_viewer_actions: true,
            te_viewer_custom_icons: [],
            te_viewer_actions_list: [],
            te_real_vod_time: true
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
    settingsScript.async = true;
    settingsScript.text = `window.twitchEnhancer = ${JSON.stringify(twitchEnhancer)}; console.info('[TE] Settings script')`; 
    head.insertBefore(settingsScript, head.lastChild);
    console.info('[TE] Settings script injected.');
    
    const script = document.createElement('script');
    script.id = 'twitch-enhancer-script';
    script.async = true;
    script.setAttribute('type', 'module');
    script.setAttribute('src', chrome.runtime.getURL('js/main.js'));
    head.insertBefore(script, head.lastChild);
    console.info('[TE] Main script injected.');
})();