import * as Peeker from '$Peeker';
import * as Logger from '$Logger';
import Component from './component';
import { getOptions } from '$Utils/messageMenu';

Peeker.registerListener('messageEvent', callback);

function callback(message, data) {
    message.addEventListener('contextmenu', (event) => {
        Logger.debug('Opening message context menu.');
        event.preventDefault();
        let menu = document.querySelector('#te-message-menu');
        if (menu) menu.remove();
        menu = Component(getOptions(message, data), message, data);
        document.body.appendChild(menu);
        menu.style.left = event.pageX - 10 + 'px';
        menu.style.top = event.pageY - 10 + 'px';
    });
}
