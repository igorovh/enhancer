import * as Logger from '$Logger';

export function getImageData(url) {
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
        Logger.warn('Cannot get image data', error);
    }
}
