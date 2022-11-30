export const parsers = {
    'cdn.discordapp.com': (url) => {
        url.host = 'media.discordapp.net';
        return url;
    },
    'imgur.com': (url) => {
        url.host = 'i.imgur.com';
        url.pathname = url.pathname + '.gif';
        return url;
    },
};
