const peeks = [];

export function add(condition, callback) {
    const peek = {
        condition,
        callback,
    };
    peeks.push(peek);
}

export function check() {
    for (const peek of peeks) {
        const value = peek.condition();
        if (value) peek.callback(value);
    }
}

setInterval(() => check(), 1000);

const listeners = [];

export function registerListener(id, callback) {
    listeners.push({ id, callback });
}

export function getListenersById(id) {
    return listeners.filter((listener) => listener.id === id);
}

export function canCreate(id, element) {
    if (!element) return false;
    let value = element.getAttribute('twitch-enhancer');
    if (!value) {
        element.setAttribute('twitch-enhancer', id);
        return true;
    }
    const ids = value.split(';');
    if (ids.includes(id)) return false;
    ids.push(id);
    element.setAttribute('twitch-enhancer', ids.join(';'));
    return true;
}

const safer = [];

export function addSafer(callback) {
    safer.push(callback);
}

setInterval(() => safer.forEach((callback) => callback()), 1000);
