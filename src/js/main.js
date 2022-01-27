import { usercardListener } from './modules/usercard/usercardListener';

const listeners = [ usercardListener ];

for(const listener of listeners) {
    const interval = setInterval(() => {
        if(listener.finder() && !listener.repeat) clearInterval(interval); 
    }, listener.time);
}