import * as Peeker from '$Peeker';
import { setText } from '$Utils/chat';

let copyMessage = false;

window.addEventListener('keydown', event => {
    if(event.shiftKey || event.key === 'Shift') {
        copyMessage = true;
        document.body.classList.add('te-copy-messages');
    }
});

window.addEventListener('keyup', event => {
    if(event.shiftKey || event.key === 'Shift') {
        copyMessage = false;
        document.body.classList.remove('te-copy-messages');
    }
});

Peeker.registerListener('messageEvent', callback);

function callback(message, data) {
    const content = data.props?.message?.message;
    if(!content) return;
    message.addEventListener('click', () => {
        if(copyMessage) setText(content, true);
    });
}