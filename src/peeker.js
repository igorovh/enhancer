const peeks = [];

export function add(condition, callback) {
    peeks.push({
        condition,
        callback
    });
}

export function check() {
    for (const peek of peeks) {
        const value = peek.condition();
        if (value) peek.callback(value);
    }
}