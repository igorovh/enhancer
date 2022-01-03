let cardChecker;
let timeFormat = 'full';
let service = 'auto'
let username = '';

let honors = [];

async function getData(name) {
    return await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: 'checkUser', service, name }, response => resolve(response));
    });
}

const timeStructure = {
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
}
function formatTime(seconds) {
    if(timeFormat === 'hour') {
        return `${(seconds / 60 / 60).toFixed(2)} hours`;
    } else {
        let result = {};
        Object.keys(timeStructure).forEach(key => {
            result[key] = Math.floor(seconds / timeStructure[key]);
            seconds -= result[key] * timeStructure[key];
        });
        const timeStrings = [
            (result.week > 0 ? `${result.week} ${result.week > 1 ? 'weeks': ' week'},` : ''),
            (result.day > 0 ? `${result.day} ${result.day > 1 ? 'days': ' day'},` : ''),
            (result.hour > 0 ? `${result.hour} ${result.hour > 1 ? 'hours': ' hour'},` : ''),
            (result.minute > 0 ? `${result.minute} min,` : '')
        ];
        const timeString = timeStrings.join(' ');
        return timeString.replace(/\s*$/,'').replace(/,$/, '');
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    const data = await fetch(`http://localhost:7773/honors?name=${getName()}`); //panel.js
    honors = await data.json();
    console.info('[te]', `Loaded ${honors.length} honors.`);
    chrome.storage.sync.get({
        te_xayo_format: 'full',
        te_xayo_service: 'auto'
    }, options => {
        timeFormat = options.te_xayo_format
        service = options.te_xayo_service;
        cardChecker = setInterval(async () => {
            const element = document.querySelector('.viewer-card');
            if(!element) return;
            if(document.querySelector('#te-card-wrapper')) return;
            username = element.getElementsByClassName('ScCoreLink-sc-udwpw5-0 AKPzc tw-link')[0]?.textContent.toLowerCase() || 
                element.getElementsByClassName('ScCoreLink-sc-udwpw5-0 itEAmU tw-link')[0]?.textContent.toLowerCase();
            if(username.includes('(')) username = username.substring(username.indexOf('(') + 1, username.indexOf(')'));
            const cardWrapper = document.createElement('div');
            cardWrapper.id = 'te-card-wrapper';
            element.insertBefore(cardWrapper, element.children[1]);
            createWatchtime();
            createHonors();
            createKonfident();
        }, 1000);
    });
});

async function createWatchtime() {
    const wrapper = document.querySelector('#te-card-wrapper');
    let watchtimeWrapper = document.createElement('div');
    watchtimeWrapper.id = 'te-card-watchtime';
    wrapper.appendChild(watchtimeWrapper);
    watchtimeWrapper.innerHTML += `<div id="te-watchtime-loading" class="te-card-line">Loading...</div>`;
    watchtimeWrapper.innerHTML += `<div class="te-card-line"><div class="te-card-separator"></div></div>`;
    const json = await getData(username);
    watchtimeWrapper = document.getElementById('te-card-watchtime'); // XD?
    watchtimeWrapper.innerHTML = '';
    console.info('[te]', 'Data downloaded (usercard).');
    if(json.error || json.watchtimes.length < 1) {
        watchtimeWrapper.innerHTML += `<div class="te-card-line">An error occurred, please try again later.</div>`;
        watchtimeWrapper.innerHTML += `<div class="te-card-line">You still can check him manually on these pages:</div>`;
        watchtimeWrapper.innerHTML += `<div class="te-card-line"><a target="_blank" href="https://vislaud.com/${username}" class="te-card-header">vislaud.com/${username}</a></div>`;
        watchtimeWrapper.innerHTML += `<div class="te-card-line"><a target="_blank" href="https://xayo.pl/${username}" class="te-card-header">xayo.pl/${username}</a></div>`;
    } else {
        watchtimeWrapper.innerHTML += `<div class="te-card-line"><a target="_blank" href="https://${json.url}" class="te-card-header">${json.url}</a></div>`;
        json.watchtimes.forEach(watchtime => {
            watchtimeWrapper.innerHTML += `
                <div class="te-card-line">
                    <span class="te-card-header">${watchtime.position}. </span>
                    <a href="https://twitch.tv/${watchtime.streamer}">${watchtime.streamer}</a>: ${formatTime(watchtime.time)} 
                    <span class="te-card-percent"> ~ ${((watchtime.time / json.time) * 100).toFixed(0)}%</span>
                </div>
            `;
        });
        watchtimeWrapper.innerHTML += `<div class="te-card-line">~ ${formatTime(json.time)}</div>`
    }
    watchtimeWrapper.innerHTML += `<div class="te-card-line"><div class="te-card-separator"></div></div>`;
}

async function createHonors() {
    const honor = honors.find(honor => honor.name.toLowerCase() === username);
    if(!honor) return;
    const wrapper = document.querySelector('#te-card-wrapper');
    wrapper.innerHTML += `
        <div id="te-card-honor">
            ${honor.type === 'permanent' ? '<div class="te-card-line" style="font-weight: bold; font-size: 10px;">THANKS, FOR:</div>' : ''}
            ${honor.description}
            <div class="te-card-line"><div class="te-card-separator"></div></div>
        </div>
    `;
}

async function createKonfident() {
    const name = getName(); //panel.js
    const wrapper = document.querySelector('#te-card-wrapper');
    wrapper.innerHTML += `
        <div id="te-card-konfident">
            <div class="te-card-line">View latest chat logs by clicking here:</div>
            <a target="_blank" href="https://konfident.vopp.top/latest/?streamer=${name}&username=${username}"><div class="xayo-line xayo-header">konfident.vopp.top</div></a>
        </div>
    `;
}