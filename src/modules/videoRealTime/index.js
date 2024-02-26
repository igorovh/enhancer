import * as Peeker from '$Peeker';
import * as Settings from '$Settings';
import { getVideo } from '$Utils/twitch';
import { getVideoId } from '$Utils/url';

let settings = Settings.get('realVideoTime');

Settings.registerUpdate('realVideoTime', (value) => (settings = value));

Peeker.add(() => {
    if (!settings) return;
    if (!window.location.href.includes('/videos/') && !window.location.href.includes('/video/')) return;
    const video = document.querySelector('.video-player__overlay');
    if (!video || !Peeker.canCreate('videoRealTime', video)) return;
    return video.querySelector('.player-controls__left-control-group');
}, callback);

let videoElement;
let videoId;
let videoData;
let timeElement;
let timeTimer;

async function callback(controls) {
    await setupVideo();
    if (timeElement) timeElement.remove();
    timeElement = document.createElement('span');
    timeElement.id = 'te-real-video-time';
    timeElement.classList.add('te-real-video-time');
    timeElement.textContent = 'Loading...';
    controls.appendChild(timeElement);
    timeElement.addEventListener('click', setTimeByURL);
    startTimer();
}

async function setupVideo(video) {
    videoElement = document.querySelector('video');
    videoId = video || getVideoId(window.location.href);
    videoData = await getVideoData(videoId);
}

function startTimer() {
    if (timeTimer) clearInterval(timeTimer);
    timeTimer = setInterval(async () => {
        const video = getVideoId(window.location.href);
        console.log('[te] vod', video);
        if (video !== videoId) {
            setupVideo(video);
            return;
        }
        setTime();
    }, 1000);
}

async function getVideoData(id) {
    const data = await fetch(`https://wcapi.igor.ovh/video/${id}`);
    const json = await data.json();
    return new Date(json.data[0].created_at);
}

function setTime() {
    timeElement.textContent = getTime(getCurrentTime());
}

function getTime(date) {
    return date.toLocaleTimeString();
}

function getCurrentVideoTime() {
    return videoElement.currentTime;
}

function getCurrentTime() {
    return new Date(videoData.getTime() + getCurrentVideoTime() * 1000);
}

async function setTimeByURL() {
    const url = new URL(
        prompt('Paste here video link with timestamp: \n(e.g. https://www.twitch.tv/videos/123456789?t=00h42m51s)')
    );
    const id = getVideoId(url.href);
    const timestamp = url.searchParams.get('t').replace(/\D/g, ':').replace('s', '').split(':');
    const seconds = parseInt(timestamp[0]) * 60 * 60 + parseInt(timestamp[1]) * 60 + parseInt(timestamp[2]);
    const createDate = await getVideoData(id);
    let date = new Date(createDate.getTime() + seconds * 1000);
    videoElement.currentTime = (date.getTime() - videoData.getTime()) / 1000;
}

Peeker.addSafer(() => {
    const button = document.querySelector('#te-real-video-time');
    if (!window.location.href.includes('/videos/') && !window.location.href.includes('/video/') && button) {
        button.remove();
        if (timeTimer) clearInterval(timeTimer);
    }
});
