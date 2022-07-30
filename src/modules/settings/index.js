import * as Peeker from '$Peeker';
import Component from './component';

Peeker.add(() => {
    return !document.querySelector('#te-settings');
}, callback);

function callback() {
    document.body.appendChild(Component());
}
