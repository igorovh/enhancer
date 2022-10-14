import * as Peeker from '$Peeker';
import Component from './component';

Peeker.add(() => {
    const chat = document.querySelector('.stream-chat');
    if (!chat || !Peeker.canCreate('chatIsland', chat)) return;
    return chat;
}, callback);

let isHovering = false;

function callback(chat) {
    const component = Component();
    component.addEventListener('mouseenter', () => (isHovering = true));
    component.addEventListener('mouseleave', () => (isHovering = false));
    chat.appendChild(component);
}

export const queue = [];

let active = false;
let shownTime = 0;

setInterval(() => {
    const island = document.querySelector('#te-chat-island');
    if (!island) return;
    if (active) {
        if (shownTime > 5 && !isHovering) {
            island.classList.add('te-chat-island-hidden');
            active = false;
            shownTime = 0;
            setTimeout((island.textContent = ''), 500);
        }
        shownTime += 0.5;
        return;
    }
    if (queue.length < 1) return;
    active = true;
    const text = queue.shift();
    island.textContent = text;
    island.classList.remove('te-chat-island-hidden');
}, 500);

window.addIslandMessage = (text) => {
    queue.push(text);
};
