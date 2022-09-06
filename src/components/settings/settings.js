export const settings = {
    chat: [
        {
            id: 'enable-bumps',
            name: 'Enable bumps',
            description: 'Enable bumping messages in the chat',
            type: 'checkbox',
        },
        {
            id: 'hide-bump-messages',
            name: 'Hide "+1" bump messages',
            description: 'Hide bumping "+1" messages',
            type: 'checkbox',
        },
        {
            id: 'hide-no-audio-video-badges',
            name: 'Hide No Audio/Video badges',
            type: 'checkbox',
        },
        {
            id: 'mentioned-sound',
            name: 'Play sound when got mentioned',
            type: 'checkbox',
        },
        {
            id: 'messages-hover',
            name: 'Highlight messages from mentioned user',
            description: 'Highlight all messages from user who got mentioned by hovering the mention',
            type: 'checkbox',
        },
    ],
    usercard: [
        {
            id: 'choose-service',
            name: 'Choose service',
            description: 'Choose service for watchtime data',
            type: 'radio',
            options: [
                { id: 'xayo-pl', name: 'xayo.pl' },
                { id: 'twitchlogger-pl', name: 'twitchlogger.pl' },
                { id: 'both', name: 'Both' },
            ],
        },
        {
            id: 'choose-time-format',
            name: 'Choose time format',
            description: 'Choose format in which watchtime data is displayed',
            type: 'radio',
            options: [
                { id: 'full', name: 'Full' },
                { id: 'hours', name: 'Hours' },
            ],
        },
    ],
    video: [
        {
            id: 'real-video-time',
            name: 'Enable Real Video Time in VODs',
            description: 'Show the real time in which the VOD was streamed',
            type: 'checkbox',
        },
        {
            id: 'count-watchtime',
            name: 'Count watchtime',
            description: 'Count the time spent watching streams',
            type: 'checkbox',
        },
    ],
};
