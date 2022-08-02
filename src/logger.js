import ansicolor from 'ansicolor';

const prefixes = {
    log: ansicolor.yellow('LOG'),
    debug: ansicolor.yellow('DEBUG'),
    info: ansicolor.green('INFO'),
    warn: ansicolor.lightYellow('WARN'),
    error: ansicolor.red('ERROR'),
};

function log(...data) {
    sendLog('log', ...data);
}

function debug(...data) {
    sendLog('debug', ...data);
}

function info(...data) {
    sendLog('info', ...data);
}

function warn(...data) {
    sendLog('warn', ...data);
}

function error(...data) {
    sendLog('error', ...data);
}

function sendLog(type, ...data) {
    console.info(...ansicolor.parse(`${ansicolor.lightMagenta('[TE]')} ${prefixes[type]}`).asChromeConsoleLogArguments, ...data);
}

export { log, debug, info, warn, error };