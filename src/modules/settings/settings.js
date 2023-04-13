export const settings = {
    chat: [
        {
            id: 'te-enable-bumps',
            title: 'Enable bumps',
            name: 'bumps.enabled',
            description: 'Enable bumping messages in the chat',
            type: 'checkbox',
        },
        {
            id: 'te-hide-bump-messages',
            title: 'Hide "+1" bump messages',
            description: 'Your bump messages will always be hidden',
            name: 'bumps.hideMessages',
            type: 'checkbox',
        },
        {
            id: 'te-hide-no-audio-video-badges',
            title: 'Hide No Audio/Video badges',
            name: 'hideNoBadges',
            type: 'checkbox',
        },
        {
            id: 'te-hide-moment-badges',
            title: 'Hide Moment badges',
            name: 'hideMomentBadges',
            type: 'checkbox',
        },
        {
            id: 'te-mentioned-sound',
            name: 'pingSound.enabled',
            title: 'Play sound when got mentioned',
            type: 'checkbox',
        },
        {
            id: 'te-messages-hover',
            name: 'highlightMentions',
            title: 'Highlight messages from mentioned user',
            description: 'Highlight all messages from user who got mentioned by hovering the mention',
            type: 'checkbox',
        },
        {
            id: 'te-chat-images',
            name: 'chatImages',
            title: 'Display images on chat',
            description: 'Displaying chat images from safe websties (e.g. discord, imgur and more; max 5mb file size)',
            type: 'checkbox',
        },
    ],
    usercard: [
        {
            id: 'te-choose-service',
            name: 'usercard.service',
            title: 'Choose service',
            description: 'Choose service for watchtime data',
            type: 'radio',
            options: [
                { id: 'xayo', title: 'xayo.pl' },
                { id: 'twitchlogger', title: 'twitchlogger.pl' },
                { id: 'auto', title: 'Auto' },
            ],
        },
        {
            id: 'te-choose-time-format',
            name: 'usercard.format',
            title: 'Choose time format',
            description: 'Choose format in which watchtime data is displayed',
            type: 'radio',
            options: [
                { id: 'full', title: 'Full' },
                { id: 'hour', title: 'Hours' },
            ],
        },
    ],
    video: [
        {
            id: 'te-real-vod-time',
            title: 'Enable Real Video Time in VODs',
            name: 'realVideoTime',
            description: 'Show the real time in which the VOD was streamed',
            type: 'checkbox',
        },
        {
            id: 'te-count-watchtime',
            title: 'Count watchtime',
            name: 'watchtime',
            description: 'Count the time spent watching streams (data is not shared with anyone)',
            type: 'checkbox',
        },
    ],
};
