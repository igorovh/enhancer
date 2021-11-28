let panelChecker;

const links = [
    {
        name: 'TwitchTracker',
        url: 'https://twitchtracker.com/%name%'
    },
    {
        name: 'Emotes',
        url: 'https://emotes.vopp.top/?name=%name%'
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
    if(name === 'popout') return elements[2];
    return name;
}

window.addEventListener('DOMContentLoaded', () => {
    panelChecker = setInterval(() => {
        if(document.querySelector('#te-buttons-wrapper')) return;
        const channelInfo = document.querySelector('.about-section__panel')?.querySelector('.fqTjdi');
        if(!channelInfo) return;
        const buttonsWrapper = document.createElement('div');
        channelInfo.appendChild(buttonsWrapper);
        console.log(channelInfo.children);
        buttonsWrapper.id = 'te-buttons-wrapper';
        buttonsWrapper.className = 'CoreText-sc-cpl358-0 ibBfde social-media-link-overflow';
        console.log('[te] Creating buttons');
        let buttons = [];
        const name = getName().toLowerCase();
        links.forEach(link => buttons.push(`<a href="${link.url.replace('%name%', name.toLowerCase())}">${link.name}</a>`));
        //TODO buttonsWrapper.innerHTML += '<br /><div id="te-chatters">Chatters Loading...</div>'; //Creating panel for chatters
        buttonsWrapper.innerHTML += buttons.join(' · ');
    }, 1000);
});

