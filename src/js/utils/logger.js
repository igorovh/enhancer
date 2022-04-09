const prefix = '[TE]';
const colors = {
    prefix: 'mediumpurple',
    info: 'lime',
    warn: 'yellow',
    error: 'red',
    debug: 'aqua'
}

function info(...data) {
    typeLog('info', data);
}

function error(...data) {
    typeLog('error', data);
}

function warn(...data) {
    typeLog('warn', data);
}

function debug(...data) {
    typeLog('debug', data);
}

function typeLog(type, data) {
    console[type](`%c${prefix} %c${type.toUpperCase()} %c${data}`, `color: ${colors.prefix}`, `color: ${colors[type]}`, 'color: white');
}

export const logger = {
    info, error, warn, debug
}