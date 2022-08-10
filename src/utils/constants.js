const LOCAL_BADGES = [
    {
        title: 'Twitch Enhancer Contributor',
        type: 'other',
        username: 'czarny_animekkk1337',
        src: 'https://coffee.vopp.top/img/favicon.png',
    },
];

const DEFAULT_SETTINGS = {
    quickLinks: {
        links: [
            {
                name: 'TwitchTracker',
                url: 'https://twitchtracker.com/%name%',
            },
            {
                name: 'SullyGnome',
                url: 'https://sullygnome.com/channel/%name%',
            },
            {
                name: 'Emotes',
                url: 'https://emotes.vopp.top/?name=%name%',
            },
        ],
    },
    pingSound: {
        enable: false,
        src: 'http://localhost:2565/sounds/notification.ogg', //TODO DEV ONLY
    },
    usercard: {
        service: 'auto',
        format: 'hour',
    },
};

export { LOCAL_BADGES, DEFAULT_SETTINGS };
