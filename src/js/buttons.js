let buttonsChecker;

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
    return url.split('/')[1];
}

window.addEventListener('DOMContentLoaded', () => {
    buttonsChecker = setInterval(() => {
        const channelInfo = document.querySelector('.about-section__panel')?.querySelector('.fqTjdi');
        if(document.querySelector('#te-buttons-wrapper')) return;
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
        buttonsWrapper.innerHTML += '<br />' + buttons.join(' · ');
    }, 1000);
});