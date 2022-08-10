import { addText } from '$Utils/chat';
import { createPopup, removePopup } from '$Utils/badgePopup';
import { LOCAL_BADGES } from '$Utils/constants';

export function addBadge(badge, message) {
    const badges =
        message.querySelector('.chat-line__username-container')?.children[0] ||
        message.querySelector('.chat-line__message--badges');
    if (!badges) return;

    const image = new Image();
    image.src = badge.src;
    image.classList.add('chat-badge', 'te-badge', 'ffz-badge');
    image.setAttribute('enhancedTitle', badge.title);
    image.setAttribute('username', badge.username);
    image.onload = () => {
        if (badges.children.length < 1) badges.appendChild(image);
        else badges.insertBefore(image, badges.firstChild);
    };
    image.addEventListener('click', pingBadge);
    image.addEventListener('contextmenu', pingBadge);
    image.addEventListener('mouseenter', createPopup);
    image.addEventListener('mouseleave', removePopup);

    return image;
}

function pingBadge(event) {
    event.preventDefault();
    const title = event.srcElement.getAttribute('enhancedTitle');
    const username = event.srcElement.getAttribute('username');
    addText(`@${username} - ${title} `, true);
}

const badgeConditions = [
    (username) => {
        return LOCAL_BADGES.filter((badge) => badge.username.toLowerCase() === username.toLowerCase());
    },
];

export function addBadgeCondition(condition) {
    badgeConditions.push(condition);
}

export function findBadges(username) {
    const badges = [];
    badgeConditions.forEach((condition) => badges.push(...condition(username)));
    return badges;
}
