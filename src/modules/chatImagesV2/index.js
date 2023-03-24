const allowedHosts = [
    'media.giphy.com',
    'i.imgur.com',
    'c.tenor.com',
    'media.discordapp.net',
    'cdn.discordapp.com',
    'imagizer.imageshack.com',
    'imgur.com',
];

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

function parseURL(url) {
    const parse = parsers[url.host];
    if (parse) {
        let oldURL = url.href;
        url = parse(url);
        console.info(`Parsed ${oldURL} into ${url.href}`);
    }
    return url;
};

function checkHost(url) {
    return allowedHosts.some((host) => url.host.endsWith(host));
};

function getImageData(url) {
    try {
        const http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send(null);

        if (http.status === 200) {
            return {
                type: http.getResponseHeader('Content-Type'),
                size: http.getResponseHeader('Content-Length'),
            };
        }
    } catch (error) {
        console.warn('Cannot get image data', error);
    }
};

function checkConditions(url, warn = true) {
    if (!checkHost(url)) return false;
    if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url.pathname)) return false;

    //Imgur Album Check
    console.log('[te] url imgur', url);
    if (url.host === 'i.imgur.com') {
        if (url.pathname.includes('/a/')) return false;
    }

    const imageData = getImageData(url.href);
    if (!imageData) return false;
    if (imageData.size > 5000000) {
        if (warn) console.warn(`Image is too large to render it.`, url.href);
        return false;
    }
    return true;
};

const target = document.querySelector('.seventv-chat-list');

// Work only if 7Tv is detected
if(target) {
    const callback = (mutationList) => {
        for (const mutation of mutationList) {
            // A child node has been added or removed
            if (mutation.type === "childList") {
                const messageContent = new URL(mutation.addedNodes[0].querySelector('.link-part').outerText);
                mutation.addedNodes[0].querySelector('.link-part').style.display = "block";
                mutation.addedNodes[0].querySelector('.link-part').style.width = "fit-content";
                const parsedURL = parseURL(messageContent);
                if(checkConditions(parsedURL)) {
                    mutation.addedNodes[0].querySelector('.link-part').innerHTML = `<img style="
                    min-height: 16px;
                    max-height: 256px;
                    margin: 0.5rem 0px;
                    " src="${parsedURL}">`;
                }
            }
          }
    }
    
    const observer = new MutationObserver(callback);
    
    observer.observe(target, { attributes: true, childList: true, subtree: true })
}