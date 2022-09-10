import * as Peeker from '$Peeker';
import { addText } from '$Utils/chat';
import { isFFZ } from '$Utils/extensions';

Peeker.registerListener('messageEvent', fix);

function fix(message) {
    if (isFFZ()) callback(message);
    else setTimeout(() => callback(message), 10); // Thanks 7TV :)
}

function callback(message) {
    const emotes = message.querySelectorAll('.chat-line__message--emote');
    if (emotes.length < 1) return;
    emotes.forEach((emote) => {
        emote.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const name = emote.alt.replace(/ /g, '');
            addText(name, true);
        });
    });
}
