import * as Peeker from '$Peeker';
import { addBadge } from '$Utils/badge';

Peeker.registerListener('messageEvent', callback);

const badgesTest = [
    {
        title: 'Twitch Enhancer Contributor',
        type: 'other',
        username: 'czarny_animekkk1337',
        src: 'https://coffee.vopp.top/img/favicon.png'
    }
]

function callback(message, data) {
    const username = data?.props?.message?.user.displayName?.toLowerCase();
    if(!username) return;
    const badges = findBadges(username);
    badges.forEach(badge => addBadge(badge, message));
}

function findBadges(username) {
    const badges = [];
    
    const badge = badgesTest.find(badge => badge.username.toLowerCase() === username.toLowerCase());
    if(badge) badges.push(badge);

    return badges;
}

