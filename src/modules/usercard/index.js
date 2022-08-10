import * as Peeker from '$Peeker';
import Component from './component';
import { getViewerCard } from '$Utils/twitch';

Peeker.add(() => {
    const usercard = document.querySelector('.viewer-card');
    if (!usercard || !Peeker.canCreate('usercard', usercard)) return;
    return usercard;
}, callback);

function callback(usercard) {
    const viewerCard = getViewerCard();
    console.log(usercard.children[1], '[te]');
    console.log(usercard.children, '[te]');
    usercard.insertBefore(Component(viewerCard.props.targetLogin), usercard.children[1]);
}
