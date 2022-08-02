import * as Peeker from '$Peeker';
import Component from './component';
import { tooltip } from '$Utils/tooltip/';

Peeker.add(() => {
    const video = document.querySelector('.video-player__overlay');
    if(!video || video?.hasAttribute('twitch-enhancer')) return;
    video.setAttribute('twitch-enhancer', '');
    return video.querySelector('.player-controls__left-control-group');
}, callback);

function callback(controls) {
    const button = Component();
    button.addEventListener('click', download);
    controls.appendChild(button);
    tooltip(button, 'te-download-clip');
}

function download() {
    window.open(document.querySelector('video').src);
}