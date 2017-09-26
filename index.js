/* eslint-disable no-underscore-dangle */
const _ = require('underscore');
const request = require('request');

class Honey {
    /**
     * Constructor. Accepts an options map.
     * @param options
     */
    constructor(options) {
        this.dataSet = options.dataSet;
        this.disabled = !!options.disabled || !options.writeKey || !options.dataSet;
        this.endpoint = options.endpoint || Honey.ApiEndpoint;
        this.writeKey = options.writeKey;
        this.clearEvents();
    }

    /**
     * Clear all events.
     */
    clearEvents() {
        this.events = [];
    }

    /**
     * Send events as a batch.
     * @private
     */
    _sendBatch() {
        if (_.isEmpty(this.events)) return;

        const events = Object.assign([], this.events);
        const body = JSON.stringify(events);
        const options = {
            url: `${this.endpoint}/${this.dataSet}`,
            headers: {
                'X-Honeycomb-Team': this.writeKey,
            },
            body,
        };
        request.post(options, (err, response) => {
            if (err) {
                console.log(err);
            }

            if (response) {
                console.log(`Received status ${response.statusCode}`);
            }
        });
    }

    /**
     * Convenience function to add an event. If adding the new event
     * would make the body size exceed the maximum of 100KiB, the
     * current list of events is sent immediately, the current events
     * list is cleared, and the new event is added to the empty list.
     * @param map
     * @private
     */
    _addEvent(map) {
        const jmap = JSON.stringify(map);
        const len = jmap.length;
        const currentLength = JSON.stringify(this.events).length;
        if (currentLength + len + 1 > Honey.MaxBodySize) {
            this._sendBatch();
            this.clearEvents();
        }
        this.events.push(map);
    }

    /**
     * Add an event to the list. Does nothing if this.disabled === true.
     * @param map
     */
    addEvent(map) {
        if (!this.disabled) {
            this._addEvent(map);
        }
    }

    /**
     * Finish up collecting events. This must be called to make sure all
     * events are actually sent to Honeycomb.
     * Does nothing if this.disabled === true.
     */
    finish() {
        if (!this.disabled) {
            this._sendBatch();
            this.clearEvents();
        }
    }
}

/**
 * This is currently the actual Honeycomb API endpoint
 */
Honey.ApiEndpoint = 'https://api.honeycomb.io/1/batch';

/**
 * The Honeycomb API accepts body sizes of up to 100KB.
 * I have rounded to 100KiB.
 */
Honey.MaxBodySize = 100 * 1000;

module.exports = Honey;
