import * as Peeker from '$Peeker';
import Component from './component';
import { tooltip } from '$Utils/tooltip/';

Peeker.add(() => {
    if (!window.location.href.includes('clips.twitch.tv')) return;
    const video = document.querySelector('.video-player__overlay');
    if (!video || !Peeker.canCreate('clipTheaterMode', video)) return;
    return video.querySelector('.player-controls__right-control-group');
}, callback);

function callback(controls) {
    const button = Component();
    button.addEventListener('click', theaterMode);
    controls.insertBefore(button, controls.querySelector('button[data-a-target="player-fullscreen-button"]').parentNode);
    tooltip(button, 'te-theatermode-clip');
}

function theaterMode() {
	document.body.classList.toggle('te-clip-theatermode');
}

Peeker.addSafer(() => {
    const button = document.querySelector('#te-clip-theatermode');
    if (!window.location.href.includes('clips.twitch.tv') && button) {
        button.remove();
    }
});