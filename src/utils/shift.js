let shift = false;

const events = {
    shift: [],
    unshift: [],
};

window.addEventListener('keydown', (event) => {
    if (event.shiftKey || event.key === 'Shift') {
        shift = true;
        events.shift.forEach((callback) => callback(event));
    }
});

window.addEventListener('keyup', (event) => {
    if (event.shiftKey || event.key === 'Shift') {
        shift = false;
        events.unshift.forEach((callback) => callback(event));
    }
});

export function isShifting() {
    return shift;
}

export function on(event, callback) {
    if (!events[event]) return;
    events[event].push(callback);
}
