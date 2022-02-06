import { loadHonors } from './data/honors.js';
import { chatButtonsListener, chatMessagesListener, qalListener, usercardListener } from './listeners/listeners.js';
import { chatButtonModule, chatEmotesModule, qalModule, usercardModule } from './modules/modules.js';

//await loadHonors();

console.log('[te]', 'test1');

const listeners = [ chatButtonsListener, chatMessagesListener, qalListener, usercardListener ];
const modules = [ chatButtonModule, chatEmotesModule, qalModule, usercardModule ];

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