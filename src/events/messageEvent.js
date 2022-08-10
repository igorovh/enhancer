import * as Peeker from '$Peeker';
import {getChatMessage} from '$Utils/twitch';

Peeker.add(() => {
    const chat = document.querySelector('.chat-scrollable-area__message-container');
    if (!chat || !Peeker.canCreate('messageEvent', chat)) return;
    return chat;
}, callback);

function callback(chat) {
    const observerCallback = (mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList' && mutation.addedNodes) {
                for (const message of mutation.addedNodes) {
                    const data = getChatMessage(message);
                    if (!data) continue;
                    Peeker.getListenersById('messageEvent').forEach((listener) => listener.callback(message, data));
                }
            }
        }
    };
    const observer = new MutationObserver(observerCallback);
    observer.observe(chat, {attributes: true, childList: true});
}
