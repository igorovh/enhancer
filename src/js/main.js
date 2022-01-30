import { usercardListener, chatButtonsListener, qalListener } from './listeners/listeners.js';
import { usercardModule, chatButtonModule ,qalModule } from './modules/modules.js';

const listeners = [ chatButtonsListener, qalListener ];
const modules = [ chatButtonModule, qalModule ];

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

export const extensionUrl = document.getElementById('twitch-enhancer-script').src.replace('js/main.js', '%name%');
