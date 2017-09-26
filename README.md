## Honeycomb batch API

This module offers a simple way to interact with the Honeycomb batch API.

Simply add events by calling `addEvent()`, and send them to Honeycomb by calling `finish()`. However, if at some point the maximum body size of 100KiB is reached, the events collected up to that point will be sent immediately. 

## Usage

```javascript
const Honey = require('honey-batch');

/**
* Pass in some options suitable for you. Other options available are:
*   - disabled: if set to true, the behaviour basically becomes no-op.
*   - endpoint: Honeycomb API endpoint. Only change this if absolutely necessary.
*/
const honey = new Honey({
    dataSet: '<YOUR DATA SET NAME>',
    writekey: '<YOUR API WRITE KEY>',
});

// Add an event. An event is basically a map.
honey.addEvent({
    time: '<YYYY-MM-DDTHH:mm:ss.SSSSZ>',
    data: { 
        type: 'GET', 
        duration: 200
    }, 
});

// This will make sure the events are actually sent to Honeycomb.
honey.finish();
```

## Warning

This package is a work in progress. Please read license for information about warranties.

## LICENSE

Copyright 2017 Sander Huijsen

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
