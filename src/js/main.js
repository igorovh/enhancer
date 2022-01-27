import { usercardListener } from './listeners/listeners.js';
import { usercardModule } from './modules/modules.js';

const listeners = [ usercardListener ];
const modules = [ usercardModule ];

for(const module of modules) {
    const listener = listeners.find(listener => listener.id === module.id);
    if(!listener) continue;
    listener.addCallback(module.callback);
}

for(const listener of listeners) {
    const interval = setInterval(() => {
        const found = listener.finder();
        if(found) listener.callbacks.forEach(callback => callback());
        if(found && !listener.repeat) clearInterval(interval);
    }, listener.time);
}