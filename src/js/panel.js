let panelChecker;

const links = [
    {
        name: 'TwitchTracker',
        url: 'https://twitchtracker.com/%name%'
    },
    {
        name: 'SullyGnome',
        url: 'https://sullygnome.com/channel/%name%'
    },
    {
        name: 'pogu.live',
        url: 'https://pogu.live/videos/%name%'
    },
    {
        name: 'Emotes',
        url: 'https://emotes.vopp.top/?name=%name%'
    },
    {
        name: 'vislaud.com',
        url: 'https://vislaud.com/%name%'
    },
    {
        name: 'xayo.pl',
        url: 'https://xayo.pl/%name%'
    }
];

function getName() {
    let url = window.location.href.replace(/(^\w+:|^)\/\//, '');
    const elements = url.split('/');
    let name = elements[1];
    if(name === 'popout' || elements[0].includes('dashboard')) return elements[2];
    return name;
}

window.addEventListener('DOMContentLoaded', () => {
    panelChecker = setInterval(() => {
        if(document.querySelector('#te-buttons-wrapper')) return;
        const channelInfo = document.querySelector('.about-section__panel')?.querySelector('.fqTjdi');
        if(!channelInfo) return;
        createMenu(channelInfo);
        createLinks(channelInfo);
    }, 1000);
});

function createMenu(element) {
    const menuWrapper = document.createElement('div');
    element.appendChild(menuWrapper);
    menuWrapper.id = 'te-menu-wrapper';
    console.log('[te] Creating menu.');
    const settingsButton = document.createElement('a');
    settingsButton.href = '#';
    settingsButton.textContent = 'Click here to open Twitch Enhancer settings.';
    settingsButton.addEventListener('click', () => chrome.runtime.sendMessage({ action: 'settings' }));
    menuWrapper.appendChild(settingsButton)
}

function createLinks(element) {
    const buttonsWrapper = document.createElement('div');
    element.appendChild(buttonsWrapper);
    buttonsWrapper.id = 'te-buttons-wrapper';
    buttonsWrapper.className = 'CoreText-sc-cpl358-0 ibBfde social-media-link-overflow';
    console.log('[te] Creating buttons.');
    let buttons = [];
    const name = getName().toLowerCase();
    links.forEach(link => buttons.push(`<a target="_blank" href="${link.url.replace('%name%', name.toLowerCase())}">${link.name}</a>`));
    buttonsWrapper.innerHTML += buttons.join(' · ');
}
