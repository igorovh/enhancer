let cardChecker;
let timeFormat = 'full';

let username = '';

async function getData(name) {
    return await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ name: name }, response => resolve(response));
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
        return `${(seconds / 60 / 60).toFixed(2)} godz.`;
    } else {
        let result = {};
        Object.keys(timeStructure).forEach(key => {
            result[key] = Math.floor(seconds / timeStructure[key]);
            seconds -= result[key] * timeStructure[key];
        });
        const timeStrings = [
            (result.week > 0 ? `${result.week} ${result.week > 1 ? 'tyg.': ' tydz.'},` : ''),
            (result.day > 0 ? `${result.day} ${result.day > 1 ? 'dni': ' dzień'},` : ''),
            (result.hour > 0 ? `${result.hour} godz.,` : ''),
            (result.minute > 0 ? `${result.minute} min.,` : '')
        ];
        const timeString = timeStrings.join(' ');
        return timeString.replace(/\s*$/,'').replace(/,$/, '');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        te_xayo_format: 'full'
    }, options => timeFormat = options.te_xayo_format);
    cardChecker = setInterval(async () => {
        const xayo = await createXayo();
        await createKonfident(xayo);
    }, 1000);
});

async function createXayo() {
    if(document.querySelector('#xayo-info')) return;
    const element = document.querySelector('.viewer-card');
    if(!element) return;
    username = element.querySelector('.tw-link').textContent.toLowerCase();
    const xayoInfo = document.createElement('div');
    xayoInfo.id = 'xayo-info';
    element.insertBefore(xayoInfo, element.children[1]);
    xayoInfo.innerHTML += `<div class="xayo-line"><a target="_blank" href="https://xayo.pl/${username}" class="xayo-header">xayo.pl/${username}</a></div>`;
    xayoInfo.innerHTML += `<div id="xayo-loading" class="xayo-line">Loading...</div>`;
    const json = await getData(username);
    console.log('[xayo-twitch]', `Got data from background script!`);
    document.querySelector('#xayo-loading').remove();
    if(json.length < 1) {
        xayoInfo.innerHTML += `<div class="xayo-line">Ten użytkownik nie istnieje w bazie danych lub xayo.pl posiada aktuanie problemy techniczne.</div>`;
    } else {
        let fullTime = 0;
        json.forEach(streamer => fullTime += (streamer.count * 5 * 60));
        for(let i = 0; i < 5; i++) {
            const streamer = json[i];
            if(!streamer) continue;
            const seconds = streamer.count * 5 * 60;
            xayoInfo.innerHTML += `<div class="xayo-line"><span class="xayo-header">${i + 1}. </span>` + 
                `<a href="https://twitch.tv/${streamer.streamer}" class="xayo-channel">${streamer.streamer}</a>: ` + 
                `${formatTime(seconds)} <span class="xayo-percent">~ ${((seconds / fullTime) * 100).toFixed(0)}%</span></div>`;
        }
        xayoInfo.innerHTML += `<div class="xayo-line">~ ${formatTime(fullTime)}</div>`
    }
    xayoInfo.innerHTML += `<div class="xayo-line"><div class="xayo-end"></div></div>`;
    return xayoInfo;
}

async function createKonfident(element) {
    if(!element) return;
    const name = getName(); //panel.js
    element.innerHTML += `<div class="xayo-line">View latest chat logs by clicking here:</div>`;
    element.innerHTML += `<a target="_blank" href="https://konfident.vopp.top/latest/?streamer=${name}&username=${username}"><div class="xayo-line xayo-header">konfident.vopp.top</div></a>`;
}