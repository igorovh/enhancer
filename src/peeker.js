const peeks = [];

export function add(condition, callback) {
    const peek = {
        condition,
        callback
    }
    peeks.push(peek);
}

export function check() {
    for (const peek of peeks) {
        const value = peek.condition();
        if (value) peek.callback(value);
    }
}

const listeners = [];

export function registerListener(id, callback) {
    listeners.push({ id, callback });
}

export function getListenersById(id) {
    return listeners.filter(listener => listener.id === id);
}