import * as Peeker from '$Peeker';
import Component from './component';
import { getViewerCard } from '$Utils/twitch';

Peeker.add(() => {
    const usercard = document.querySelector('.viewer-card');
    if (!usercard || !Peeker.canCreate('usercard', usercard)) return;
    return usercard;
}, callback);

async function callback(usercard) {
    const viewerCard = getViewerCard();
    const loading = document.createElement('span');
    usercard.insertBefore(loading, usercard.children[1]);
    usercard.insertBefore(await Component(viewerCard.props.targetLogin), usercard.children[1]);
    loading.remove();
}
