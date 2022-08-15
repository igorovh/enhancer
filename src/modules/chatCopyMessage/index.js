import * as Peeker from '$Peeker';
import { setText } from '$Utils/chat';
import * as shift from '$Utils/shift';

let copyMessage = false;

shift.on('shift', () => {
    copyMessage = true;
    document.body.classList.add('te-copy-messages');
});

shift.on('unshift', () => {
    copyMessage = false;
    document.body.classList.remove('te-copy-messages');
})

Peeker.registerListener('messageEvent', callback);

function callback(message, data) {
    const content = data.props?.message?.message;
    if (!content) return;
    message.addEventListener('click', (event) => {
        if (copyMessage) {
            event.preventDefault();
            setText(content, true);
        }
    });
}
