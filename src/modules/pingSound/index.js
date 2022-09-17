import * as Peeker from '$Peeker';
import * as Settings from '$Settings';
import { getUsername } from '$Utils/chat';

let settings = Settings.getMultiple('pingSound.enabled', 'pingSound.src');
let enabled = settings['pingSound.enabled'];

let audio = new Audio(settings['pingSound.src']);

Settings.registerUpdate('pingSound.enabled', (value) => {
    enabled = value;
});

Settings.registerUpdate('pingSound.src', (value) => {
    audio = new Audio(value);
});

Peeker.registerListener('messageEvent', callback);

let username = getUsername();

function callback(message, data) {
    if (!enabled) return;
    if (!data.props.message) return;
    if (data.props.message.message || data.props.message.messageBody) {
        if (!username) {
            username = getUsername();
            return;
        }
        if (data.props.message.message?.includes(username) || data.props.message.messageBody?.includes(username)) {
            if (!audio.paused) audio.currentTime = 0;
            else audio.play();
        }
    }
}
