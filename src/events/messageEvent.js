import * as Peeker from '$Peeker';

Peeker.add(() => {
    const chat = document.querySelector('.chat-scrollable-area__message-container');
    if(!chat || chat?.hasAttribute('twitch-enhancer')) return;
    chat.setAttribute('twitch-enhancer', '');
    return chat;
}, callback);

function callback(chat) {
    const observerCallback = (mutationList) => {
        for(const mutation of mutationList) {
            if(mutation.type === 'childList' && mutation.addedNodes) {
                for(const message of mutation.addedNodes) {
                    Peeker.getListenersById('messageEvent').forEach(listener => listener.callback(message));
                }
            }
        }
    };
    const observer = new MutationObserver(observerCallback);
    observer.observe(chat, { attributes: true, childList: true });
}