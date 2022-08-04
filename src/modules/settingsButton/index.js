import * as Peeker from '$Peeker';
import Component from './component';
import { tooltip } from '$Utils/tooltip/';
import { show } from '../../settings';

Peeker.add(() => {
    const chatButtons = document.querySelector('.stream-chat-header');
    if(!chatButtons || chatButtons?.hasAttribute('twitch-enhancer')) return;
    chatButtons.setAttribute('twitch-enhancer', '');
    return chatButtons;
}, callback);

function callback(chatButtons) {
    const component = Component();
    chatButtons.appendChild(component);
    component.addEventListener('click', show);
    tooltip(component, 'te-settings');
}