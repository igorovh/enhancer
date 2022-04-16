import { extensionListeners } from './listeners/listeners.js';
import { extensionModules } from './modules/modules.js';
import { logger } from './utils/logger.js';
import { customIcons } from './data/customIcons.js';

export const twitchEnhancer = window.twitchEnhancer;

const listeners = extensionListeners;
const modules = extensionModules;

for(const module of modules) {
    if(module.setting) if(!twitchEnhancer.settings[module.setting]) continue;
    const listener = listeners.find(listener => listener.id === module.id);
    if(!listener) continue;
    listener.addCallback(module.callback);
}

for(const listener of listeners) {
    const interval = setInterval(() => {
        const found = listener.finder(document);
        if(found) listener.callbacks.forEach(callback => callback(found));
        if(found && !listener.repeat) clearInterval(interval);
    }, listener.time);
}

customIcons.push(...twitchEnhancer.settings.te_viewer_custom_icons);

logger.info('Main script loaded.');