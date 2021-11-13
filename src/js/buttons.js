let infoChecker;

window.addEventListener('DOMContentLoaded', () => {
    infoChecker = setInterval(() => {
        const channelInfo = document.querySelector('.about-section__panel--content');
        if(!channelInfo) return;
        const buttonsWrapper = document.createElement('div');
        console.log('test', 'found');
        buttonsWrapper.id = 'te-buttons-wrapper';
        buttonsWrapper.innerHTML += `<a href="test"><div class="te-button"></div></a>`;
        channelInfo.append(buttonsWrapper);
        console.log('test', 'creating buttons');
        clearInterval(infoChecker);
    }, 1000);
});