import * as Peeker from '$Peeker';
import {findHonor} from '$Utils/honor';

Peeker.registerListener('messageEvent', callback);

function callback(message, data) {
    const username = data?.props?.message?.user.displayName?.toLowerCase();
    const name = message.querySelector('.chat-line__username');
    if (!name || !username) return;

    const honor = findHonor(username);
    if (!honor) return;

    const color = name.style.color || name.firstChild.firstChild.style.color || 'white';
    name.style.textShadow = `${color} 0 0 10px`;
}
