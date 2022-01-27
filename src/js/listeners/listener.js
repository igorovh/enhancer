export class Listener {

    callbacks = []

    constructor(id, finder, repeat, time) {
        this.id = id;
        this.finder = finder;
        this.repeat = repeat;
        this.time = time;
    }

    addCallback(callback) {
        this.callbacks.push(callback);
    }

}