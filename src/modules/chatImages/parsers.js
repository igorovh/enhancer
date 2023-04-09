const parsers = {
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

export function parseURL(url) {
    const parse = parsers[url.host];
    if (parse) {
        url = parse(url);
    }
    return url;
}
