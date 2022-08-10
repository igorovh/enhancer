import * as Peeker from '$Peeker';
import Component from './component';
import {tooltip} from '$Utils/tooltip';

Peeker.add(() => {
    const viewersCount = document.querySelector('p[data-a-target="animated-channel-viewers-count"]')?.parentElement;
    if (!viewersCount || !Peeker.canCreate('chattersCount', viewersCount)) return;
    return viewersCount;
}, callback);

function callback(viewersCount) {
    const chatters = Component();
    tooltip(chatters, 'te-chatters-count');
    addIcon(viewersCount);
    viewersCount.appendChild(chatters);
}

function addIcon(element) {
    element.innerHTML +=
        '<div id="te-chatters-count-icon" role="presentation" class="Layout-sc-nxg1ff-0 lkewIo"><figure class="ScFigure-sc-1j5mt50-0 kYSkP tw-svg"><svg type="color-text-accessible-red" width="20px" height="20px" version="1.1" viewBox="0 0 20 20" x="0px" y="0px" class="ScSvg-sc-1j5mt50-1 iJGqwF"><g><path fill-rule="evenodd" d="M5 7a5 5 0 116.192 4.857A2 2 0 0013 13h1a3 3 0 013 3v2h-2v-2a1 1 0 00-1-1h-1a3.99 3.99 0 01-3-1.354A3.99 3.99 0 017 15H6a1 1 0 00-1 1v2H3v-2a3 3 0 013-3h1a2 2 0 001.808-1.143A5.002 5.002 0 015 7zm5 3a3 3 0 110-6 3 3 0 010 6z" clip-rule="evenodd"></path></g></svg></figure></div>';
}
