export default class Mediator {
    EventNames = {
        LOCATION_CHANGED_EVENT_NAME: 'location_changed'
    };

    constructor() {
        this.events = {};
    }

    addEventListener(name, handler) {
        if (this.events.hasOwnProperty(name))
            this.events[name].push(handler);
        else
            this.events[name] = [handler];
    };

    removeEventListener(name, handler) {
        /* This is a bit tricky, because how would you identify functions?
           This simple solution should work if you pass THE SAME handler. */
        if (!this.events.hasOwnProperty(name))
            return;

        const index = this.events[name].indexOf(handler);
        if (index != -1)
            this.events[name].splice(index, 1);
    };

    fireEvent(name, args) {
        if (!this.events.hasOwnProperty(name))
            return;

        if (!args || !args.length)
            args = [];

        const evs = this.events[name];
        evs.forEach((item) => {
            item.apply(null, args);
        });
    };
}
