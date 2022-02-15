import { loadHonors } from './data/honors.js';
import { chatButtonListener, chatMessagesListener, qalListener, usercardListener } from './listeners/listeners.js';
import { chatButtonModule, chatEmotesModule, chatMessagesModule, qalModule, usercardModule } from './modules/modules.js';
import { logger } from './utils/logger.js';

await loadHonors();

const listeners = [ chatButtonListener, chatMessagesListener, qalListener, usercardListener ];
const modules = [ chatButtonModule, chatEmotesModule, chatMessagesModule, qalModule, usercardModule ];

for(const module of modules) {
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

export const twitchEnhancer = window.twitchEnhancer;

logger.info('Main script loaded.');