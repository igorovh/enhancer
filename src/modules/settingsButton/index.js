import * as Peeker from '$Peeker';
import Component from './component';
import { tooltip } from '$Utils/tooltip/';
import { show } from '$Settings';

Peeker.add(() => {
    const topNavigation = document.querySelector('.top-nav__menu');
    if (!topNavigation) return;
    if (topNavigation.children.length < 2) return;
    if (!Peeker.canCreate('settingsButton', topNavigation)) return;
    return topNavigation.children[2];
}, callback);

function callback(topNavigation) {
    const component = Component();
    topNavigation.insertBefore(component, topNavigation.firstChild);
    component.addEventListener('click', show);
    tooltip(component, 'te-settings');
}
