import { getFile } from '$Utils/files';

export const LOCAL_BADGES = [
    {
        title: 'Twitch Enhancer Contributor',
        type: 'other',
        username: 'igor_ovh',
        src: getFile('img/icon.png'),
    },
    {
        title: 'Twitch Enhancer Contributor',
        type: 'other',
        username: 'd33zor',
        src: getFile('img/icon.png'),
    },
    {
        title: 'Twitch Enhancer Contributor',
        type: 'other',
        username: 'kawre',
        src: getFile('img/icon.png'),
    },
    {
        title: 'Twitch Enhancer Contributor',
        type: 'other',
        username: 'usermacieg',
        src: getFile('img/icon.png'),
    },
];

export const DEFAULT_SETTINGS = {
    quickLinks: [
        {
            name: 'TwitchTracker',
            url: 'https://twitchtracker.com/%name%',
        },
        {
            name: 'SullyGnome',
            url: 'https://sullygnome.com/channel/%name%',
        },
    ],
    'bumps.enabled': true,
    'bumps.hideMessages': true,
    hideNoBadges: true,
    'pingSound.enabled': false,
    'pingSound.src': getFile('sounds/notification.ogg'),
    highlightMentions: true,
    'usercard.service': 'auto',
    'usercard.format': 'hour',
    realVideoTime: true,
    watchtime: true,
    chatImages: false,
};

export const LOCAL_HONORS = [
    {
        username: 'igor_ovh',
        type: 'contibutor',
    },
    {
        username: 'd33zor',
        type: 'contibutor',
    },
    {
        username: 'kawre',
        type: 'contibutor',
    },
    {
        username: 'usermacieg',
        type: 'contibutor',
    },
    {
        username: 'lewus',
        type: 'other',
    },
    {
        username: 'nyloniarz',
        type: 'other',
    },
    {
        username: 'b3akers',
        type: 'other',
    },
    {
        username: 'xyves',
        type: 'other',
    },
    {
        username: 'piotrgamerpl',
        type: 'tester',
    },
    {
        username: 'm0rtak_',
        type: 'tester',
    },
    {
        username: 'conki__',
        type: 'tester',
    },
    {
        username: 'grzegoryflorida',
        type: 'tester',
    },
    {
        username: 'jsdthe1st',
        type: 'tester',
    },
    {
        username: 'mxj1337',
        type: 'tester',
    },
    {
        username: 'h2p_ygus',
        type: 'tester',
    },
    {
        username: 'marekkk2007',
        type: 'tester',
    },
    {
        username: 'nowy_lepszy_silver',
        type: 'tester',
    },
    {
        username: 'plyta__',
        type: 'tester',
    },
    {
        username: 'kolegajakub_',
        type: 'tester',
    },
    {
        username: 'mrsono1212',
        type: 'tester',
    },
    {
        username: 'rqqn_',
        type: 'tester',
    },
];
