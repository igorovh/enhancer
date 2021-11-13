let currentId;
let startDate;

let locationChecker;
let timeUpdater;

let time;

function getCurrentTime() {
    return new Date(startDate.getTime() + (getCurrentVideoTime() * 1000));
}

function getId(link) {
    let id = link.replace('https://www.twitch.tv/videos/', '');
    if(id.includes('?')) id = id.substring(0, id.lastIndexOf('?'));
    return id;
}

async function getCreateTime(id) {
    // const data = await fetch(`https://api.twitch.tv/v5/videos/${id}/comments`, {
    //     headers: {
    //         'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko'
    //     }
    // });
    // const json = await data.json();
    // const message = json.comments[0];
    // const createdDate = new Date(message.created_at);
    // return new Date(createdDate.getTime() - (message.content_offset_seconds * 1000));
    const data = await fetch(`https://api.twitch.tv/kraken/videos/${id}`, {
        headers: {
            'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
            'Accept': 'application/vnd.twitchtv.v5+json'
        }
    });
    const json = await data.json();
    return new Date(json.created_at);
}

function getCurrentVideoTime() {
    return document.querySelector('video').currentTime;
}

function getTime(date) {
    return date.toLocaleTimeString();
}

async function setTimeFromUrl() {
    const url = new URL(prompt('Paste here video link with timestamp: \n(e.g. https://www.twitch.tv/videos/123456789?t=00h42m51s)'));
    const id = getId(url.href);
    const timestamp = url.searchParams.get('t').replace(/\D/g, ':').replace('s', '').split(':');
    const seconds = (parseInt(timestamp[0]) * 60 * 60) + (parseInt(timestamp[1]) * 60) + parseInt(timestamp[2]);
    const createDate = await getCreateTime(id);
    let date = new Date(createDate.getTime() + (seconds * 1000));
    document.querySelector('video').currentTime = (date.getTime() - startDate.getTime()) / 1000;
}

function createTime() {
    const controls = document.querySelector('.player-controls__left-control-group');
    console.info('[te]', 'Trying to create element...');
    if(!controls) return;
    time = document.createElement('span');
    time.textContent = getTime(getCurrentTime());
    time.id = 'vod-time';
    time.addEventListener('click', setTimeFromUrl);
    controls.appendChild(time);
    console.info('[te]', 'Element created.');
    console.info('[te]', 'Creating timer for updating seconds...');
    timeUpdater = setInterval(() => time.textContent = getTime(getCurrentTime()), 500);
    console.info('[te]', 'Timer created.');
    console.info('[te]', 'Everything done.');
}

window.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        te_real_vod_time: true
    }, options => {
        if(!options.te_real_vod_time) return;
        locationChecker = setInterval(async () => {
            const oldTime = document.querySelector('#vod-time');
            if(!window.location.toString().startsWith('https://www.twitch.tv/videos/')) {
                currentId = '';
                if(oldTime) oldTime.remove();
                return;
            }
            const newId = getId(window.location.toString());
            if(newId === currentId) return;
            currentId = newId;
            clearInterval(timeUpdater);
    
            if(oldTime) oldTime.remove();
            
            console.info('[te]', `Found ${newId}.`);
            console.info('[te]', `Fetching data...`);
            startDate = await getCreateTime(newId);
            console.info('[te]', `Creating element...`);
            createTime();
        }, 1000);
    });
});