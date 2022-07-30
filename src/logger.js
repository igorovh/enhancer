import ansicolor from 'ansicolor';

const prefixes = {
    log: ansicolor.yellow('LOG  '),
    debug: ansicolor.yellow('DEBUG'),
    info: ansicolor.green('INFO '),
    warn: ansicolor.lightYellow('WARN '),
    error: ansicolor.red('ERROR'),
};

export default class Logger {

    constructor(name) {
        if(name) this.name = name.toUpperCase();
    }

    log(...data) {
        this.#sendLog('log', ...data);
    }
    
    debug(...data) {
        this.#sendLog('debug', ...data);
    }

    info(...data) {
        this.#sendLog('info', ...data);
    }

    warn(...data) {
        this.#sendLog('warn', ...data);
    }

    error(...data) {
        this.#sendLog('error', ...data);
    }

    #sendLog(type, ...data) {
        const log = [
            ansicolor.lightMagenta('[TE]'), 
            prefixes[type], 
            (this.name ? ansicolor.lightCyan(`[${this.name}]`) : undefined)
        ].filter(text => text).join(' ');
        console.info(...ansicolor.parse(log).asChromeConsoleLogArguments, ...data);
    }
}