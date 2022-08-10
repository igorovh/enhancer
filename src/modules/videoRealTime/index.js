import * as Peeker from '$Peeker';
import { getVideo } from '$Utils/twitch';

Peeker.add(() => {
    const video = document.querySelector('.video-player__overlay');
    if (!video || !Peeker.canCreate('videoRealTime', video)) return;
    return video.querySelector('.player-controls__left-control-group');
}, callback);

function callback() {
    console.log('[te]', getVideo());
    // controls.innerHTML += 'test';
}
