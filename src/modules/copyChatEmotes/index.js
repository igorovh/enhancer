import * as Peeker from '$Peeker';
import { addText } from '$Utils/chat';

Peeker.registerListener('messageEvent', callback);

function callback(message) {
    const emotes = message.querySelectorAll('.chat-line__message--emote');
    if(emotes.length < 1) return;
    emotes.forEach(emote => {
        emote.addEventListener('contextmenu', event => {
            event.preventDefault();
            const name = emote.alt.replace(/ /g, '');
            addText(name, true);
        });
    });
}