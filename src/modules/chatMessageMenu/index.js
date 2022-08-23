import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import Component from './component';
import { getOptions } from '$Utils/messageMenu';

Peeker.registerListener('messageEvent', callback);

document.addEventListener('click', (event) => {
    if (event.target.offsetParent?.id !== 'te-message-menu') {
        const menu = document.querySelector('#te-message-menu');
        if (menu) menu.remove();
    }
});

function callback(message, data) {
    message.addEventListener('contextmenu', (event) => {
        if (event.target.classList.contains('chat-line__message--emote')) return;
        Logger.debug('Opening message context menu.');
        event.preventDefault();
        let menu = document.querySelector('#te-message-menu');
        if (menu) menu.remove();
        menu = Component(getOptions(message, data), message, data);
        document.body.appendChild(menu);

        let x = event.pageX;
        if (x + menu.offsetWidth > window.innerWidth) {
            x = window.innerWidth - menu.offsetWidth;
        }
        let y = event.pageY - 10;
        if (y + menu.offsetHeight > window.innerHeight) {
            y = window.innerHeight - menu.offsetHeight;
        }
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
    });
}
