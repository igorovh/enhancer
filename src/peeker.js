const peeks = [];

export function add(condition, callback, setting, settingCallback) {
    const peek = {
        condition,
        callback
    }
    if(setting && settingCallback) peek.setting = { id: setting, callback: settingCallback }; 
    peeks.push(peek);
}

export function check() {
    for (const peek of peeks) {
        const value = peek.condition();
        if (value) peek.callback(value);
    }
}

export function update(setting) {
    peeks
        .filter(peek => peek?.setting?.setting === setting)
        .forEach(peek => peek?.setting?.callback());
}

const listeners = [];

export function registerListener(id, callback) {
    listeners.push({ id, callback });
}

export function getListenersById(id) {
    return listeners.filter(listener => listener.id === id);
}