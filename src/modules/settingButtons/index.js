import * as Peeker from '$Peeker';
import Component from './component';

Peeker.add(() => {
    const chatButtons = document.querySelector('.stream-chat-header');
    if(!chatButtons || chatButtons.hasAttribute('twitch-enhancer')) return;
    chatButtons.setAttribute('twitch-enhancer', '');
    return chatButtons;
}, callback);

function callback(chatButtons) {
    chatButtons.innerHTML += Component;
}
