import * as Peeker from '$Peeker';
import { get } from '$Settings';
import { getName } from '$Utils/url';
import Component from './component';

const links = get('quickLinks');

Peeker.add(() => {
    const panel = document.querySelector('.about-section__panel--content');
    if (!panel || !Peeker.canCreate('quickLinks', panel)) return;
    return panel.querySelector('.BEqWe') || panel;
}, callback);

function callback(panel) {
    panel.appendChild(Component(links, getName()));
}
