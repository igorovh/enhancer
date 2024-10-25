import * as Logger from '$Logger';
import * as Peeker from '$Peeker';
import { getChatMessage } from '$Utils/twitch';

Peeker.add(() => {
    const chat =
        document.querySelector('.chat-scrollable-area__message-container') ||
        document.querySelector('.seventv-chat-list');
    if (!chat || !Peeker.canCreate('messageEvent', chat)) return;
    return chat;
}, callback);

function callback(chat) {
    Peeker.getListenersById('chatInitialize').forEach((listener) => listener.callback());
    const observerCallback = (mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'childList' && mutation.addedNodes) {
                for (const divMessage of mutation.addedNodes) {
                    const message = divMessage.children[0];
                    const data = getChatMessage(message);
                    if (!data) continue;
                    Peeker.getListenersById('messageEvent').forEach((listener) => listener.callback(message, data));
                }
            }
        }
    };
    const observer = new MutationObserver(observerCallback);
    observer.observe(chat, { attributes: true, childList: true });
    Logger.info('Started listening for chat messages.');
}
