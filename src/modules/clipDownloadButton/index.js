import * as Peeker from '$Peeker';
import Component from './component';
import { tooltip } from '$Utils/tooltip/';

Peeker.add(() => {
    if (!window.location.href.includes('clips.twitch.tv') && !window.location.href.includes('/clip/')) return;
    const video = document.querySelector('.video-player__overlay');
    if (!video || !Peeker.canCreate('clipDownloadButton', video)) return;
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

Peeker.addSafer(() => {
    const button = document.querySelector('#te-clip-download');
    if (!window.location.href.includes('clips.twitch.tv') && !window.location.href.includes('/clip/') && button) {
        button.remove();
    }
});
