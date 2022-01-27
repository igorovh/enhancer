export class Listener {

    callbacks = []

    constructor(finder, repeat, time) {
        this.finder = finder;
        this.repeat = repeat;
        this.time = time;
    }

    addCallback(callback) {
        this.callbacks.push(callback);
    }

}