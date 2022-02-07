import { Module } from '../module.js';
import { fixName } from '../../utils/name.js';
import { getName } from '../../utils/url.js';
import { honors } from '../../data/honors.js';
import { logger } from '../../utils/logger.js';
import { formatTime } from '../../utils/time.js';
import { twitchEnhancer } from '../../main.js';

export const usercardModule = new Module('usercard', callback);

function callback(element) {
    element.setAttribute('twitch-enhancer', '');
    let username = element.getElementsByClassName('ScCoreLink-sc-udwpw5-0 AKPzc tw-link')[0]?.textContent.toLowerCase() || 
        element.getElementsByClassName('ScCoreLink-sc-udwpw5-0 itEAmU tw-link')[0]?.textContent.toLowerCase();
    username = fixName(username);
    logger.info(`Found new user card - ${username}.`);
    const cardWrapper = document.createElement('div');
    cardWrapper.id = 'te-card-wrapper';
    element.insertBefore(cardWrapper, element.children[1]);
    createWatchtime(username, cardWrapper);
    createHonors(username, cardWrapper);
    createKonfident(username, cardWrapper);
}

async function createWatchtime(username, cardWrapper) {
    let watchtimeWrapper = document.createElement('div');
    watchtimeWrapper.id = 'te-card-watchtime';
    cardWrapper.appendChild(watchtimeWrapper);
    watchtimeWrapper.innerHTML += `<div id="te-watchtime-loading" class="te-card-line">Loading...</div>`;
    watchtimeWrapper.innerHTML += `<div class="te-card-line"><div class="te-card-separator"></div></div>`;
    const json = await getData(username, twitchEnhancer.settings.te_xayo_service);
    watchtimeWrapper = document.getElementById('te-card-watchtime'); // XD?
    watchtimeWrapper.innerHTML = '';
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
                    <a href="https://twitch.tv/${watchtime.streamer}">${watchtime.streamer}</a>: ${formatTime(watchtime.time, twitchEnhancer.settings.te_xayo_format)} 
                    <span class="te-card-percent"> ~ ${((watchtime.time / json.time) * 100).toFixed(0)}%</span>
                </div>
            `;
        });
        watchtimeWrapper.innerHTML += `<div class="te-card-line">~ ${formatTime(json.time, watchtime.time, twitchEnhancer.settings.te_xayo_format)}</div>`
    }
    watchtimeWrapper.innerHTML += `<div class="te-card-line"><div class="te-card-separator"></div></div>`;
}

async function createHonors(username, cardWrapper) {
    const honor = honors.find(honor => honor.name.toLowerCase() === username);
    if(!honor) return;
    cardWrapper.innerHTML += `
        <div id="te-card-honor">
            ${honor.type === 'permanent' ? '<div class="te-card-line" style="font-weight: bold; font-size: 10px;">THANKS, FOR:</div>' : ''}
            <div class="te-card-line">${honor.description}</div>
            <div class="te-card-line"><div class="te-card-separator"></div></div>
        </div>
    `;
}

async function createKonfident(username, cardWrapper) {
    const name = getName(window.location.href).toLowerCase();
    cardWrapper.innerHTML += `
        <div id="te-card-konfident">
            <div class="te-card-line">View latest chat logs by clicking here:</div>
            <a target="_blank" href="https://konfident.vopp.top/latest/?streamer=${name}&username=${username}"><div class="xayo-line xayo-header">konfident.vopp.top</div></a>
        </div>
    `;
}

// Watchtime

async function getData(name, service) {
    logger.log(`${name} ${service}`)
    if(service === 'auto') {
        return await getAuto(name);
    } else if(service === 'xayo') {
        return await getXayo(name);
    } else if(service === 'vislaud') {
        return await getVislaud(name);
    }
}

async function getAuto(name) {
    const xayo = await getXayo(name);
    const vislaud = await getVislaud(name);
    if(!xayo.error && !vislaud.error) {
        if(xayo.time > vislaud.time) return xayo;
        else return vislaud;
    }
    if(xayo.error) return vislaud;
    else return xayo;
}

async function getVislaud(name) {
    let json = await fetch(`https://vislaud.com/api/chatters?logins=${name}`);
    json = await json.json();
    if(json.length < 1) return { error: 404 };
    json = json[0];
    let allTime = 0;
    json.watchtimes.sort((a, b) => {
        return b.watchtime - a.watchtime;
    });
    json.watchtimes.forEach(streamer => allTime += streamer.watchtime * 60);
    const watchtime = {
        url: `vislaud.com/${name}`,
        time: allTime,
        watchtimes: []
    }
    for(let i = 0; i < 5; i++) {
        if(json.watchtimes[i]) {
            watchtime.watchtimes.push({
                position: i + 1,
                streamer: json.watchtimes[i].streamer.displayName,
                time: json.watchtimes[i].watchtime * 60
            });
        }
    }
    return watchtime;
}

async function getXayo(name) {
    let json = await fetch(`https://xayo.pl/api/watchtime/${name}`);
    json = await json.json();
    if(json.length < 1) return { error: 404 };
    let allTime = 0;
    json.forEach(streamer => allTime += streamer.count * 5 * 60);
    const watchtime = {
        url: `xayo.pl/${name}`,
        time: allTime,
        watchtimes: []
    }
    for(let i = 0; i < 5; i++) {
        if(json[i]) {
            watchtime.watchtimes.push({
                position: i + 1,
                streamer: json[i].streamer,
                time: json[i].count * 5 * 60
            });
        }
    }
    return watchtime;
}