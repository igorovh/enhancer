const prefix = '[TE]';
const colors = {
    prefix: 'mediumpurple',
    info: 'lime',
    warn: 'yellow',
    error: 'red',
    log: 'aqua'
}

function info(message) {
    typeLog(message, 'info');
}

function error(message) {
    typeLog(message, 'error');
}

function warn(message) {
    typeLog(message, 'warn');
}

function log(message) {
    typeLog(message, 'log');
}

function typeLog(message, type) {
    console.log(`%c${prefix} %c${type.toUpperCase()} %c${message}`, `color: ${colors.prefix}`, `color: ${colors[type]}`, 'color: white');
}

export const logger = {
    info, error, warn, log
}