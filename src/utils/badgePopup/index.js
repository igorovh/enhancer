import Component from './component';

export function createPopup(event) {
    removePopup();
    const popup = document.createElement('div');
    popup.id = 'te-badge-popup';
    const title = event.srcElement.getAttribute('enhancedTitle');
    popup.innerHTML = Component(title, event.srcElement.src);

    const y = event.pageY - 50;
    popup.style.top = (y < 0 ? 0 : y) + 'px';
    popup.style.left = (event.pageX + 25) + 'px';

    document.getElementById('root').children[0].appendChild(popup);
}

export function removePopup() {
    const popup = document.querySelector('#te-badge-popup');
    if(popup) popup.remove();
}