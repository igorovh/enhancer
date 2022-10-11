import * as Peeker from '$Peeker';
import Component from './component';

Peeker.add(() => {
    const chat = document.querySelector('.stream-chat');
    if (!chat || !Peeker.canCreate('chatIsland', chat)) return;
    return chat;
}, callback);

function callback(chat) {
    const component = Component();
    chat.appendChild(component);
}
