import * as Peeker from '$Peeker';
import * as Settings from '$Settings';
import {getUsername} from '$Utils/chat';

let sound = Settings.get('pingSound');

let audio = new Audio(sound.src);

Settings.registerUpdate('pingSound', (value) => {
    sound = value;
    audio = new Audio(sound.src);
});

Peeker.registerListener('messageEvent', callback);

let username = getUsername();

function callback(message, data) {
    if (!sound.enable) return;
    if (!data.props.message) return;
    if (!data.props.message.message) return;
    if (!username) {
        username = getUsername();
        return;
    }
    if (data.props.message.message.includes(username)) {
        if (!audio.paused) audio.currentTime = 0;
        else audio.play();
    }
}
