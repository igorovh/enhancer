let cardChecker;
let timeFormat = 'full';

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
        return timeString.replace(/,$/, '');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        te_xayo_format: 'full'
    }, options => timeFormat = options.te_xayo_format);
    cardChecker = setInterval(async () => {
        if(document.querySelector('#xayo-info')) return;
        const element = document.querySelector('.viewer-card');
        if(!element) return;
        const name = element.querySelector('.tw-link').textContent.toLowerCase();
        const xayoInfo = document.createElement('div');
        xayoInfo.id = 'xayo-info';
        element.insertBefore(xayoInfo, element.children[1]);
        const json = await getData(name);
        console.log('[xayo-twitch]', `Got data from background script!`);
        xayoInfo.innerHTML += `<div class="xayo-line"><a href="https://xayo.pl/${name}" class="xayo-header">xayo.pl/${name}</a></div>`;
        if(json.length < 1) {
            xayoInfo.innerHTML += `<div class="xayo-line">Ten użytkownik nie istnieje w bazie danych lub xayo.pl posiada aktuanie problemy techniczne.</div>`;
            return;
        }
        for(let i = 0; i < 5; i++) {
            const streamer = json[i];
            if(!streamer) continue;
            xayoInfo.innerHTML += `<div class="xayo-line"><span class="xayo-header">${i + 1}. </span>` + 
                `<a href="https://twitch.tv/${streamer.streamer}" class="xayo-channel">${streamer.streamer}</a>: ${formatTime(streamer.count * 5 * 60)}</div>`;
        }
    }, 1000);
});