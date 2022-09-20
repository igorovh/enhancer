import * as Peeker from '$Peeker';
import * as Settings from '$Settings';
import { getUsername } from '$Utils/chat';

let settings = Settings.getMultiple('pingSound.enabled', 'pingSound.src');
let enabled = settings['pingSound.enabled'];

let audio = new Audio();
audio.crossOrigin = 'anonymous';
audio.src = settings['pingSound.src'];
audio.load();

Settings.registerUpdate('pingSound.enabled', (value) => {
    enabled = value;
});

Settings.registerUpdate('pingSound.src', (value) => {
    audio.src = value;
    audio.load();
});

let username = getUsername();

Peeker.registerListener('messageEvent', callback);

function callback(message, data) {
    setTimeout(() => {
        if (!enabled) return;
        if (data.props.message?._enhancer_bumps) return;
        const messageContent =
            data.props.message?.message?.toLowerCase() ?? data.props.message?.messageBody?.toLowerCase();
        if (!messageContent) return;
        const currentName =
            data?.props?.message?.user.displayName?.toLowerCase() ||
            data?.props?.message?.user.userDisplayName?.toLowerCase();
        if (!username) {
            username = getUsername();
            return;
        }
        if (username.toLowerCase() === currentName.toLowerCase()) return;
        if (messageContent.includes(username.toLowerCase())) playAudio();
    }, 5);
}

function playAudio() {
    audio.load();
    if (!audio.paused) audio.currentTime = 0;
    else audio.play();
}
