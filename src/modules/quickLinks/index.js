import * as Peeker from '$Peeker';
import { get } from '$Settings';
import { getName } from '$Utils/url';
import Component from './component';

const links = get('quickLinks').links;

Peeker.add(() => {
    const panel = document.querySelector('.about-section__panel--content');
    if(!panel || panel?.hasAttribute('twitch-enhancer')) return;
    panel.setAttribute('twitch-enhancer', '');
    return panel.querySelector('p')?.parentElement;
}, callback);

function callback(panel) {
    panel.appendChild(Component(links, getName()));
}