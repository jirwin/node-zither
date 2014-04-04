# zither

Zither is an simple and experimental tool that allows you to easily instrument your code, and react to instrumentation in multiple ways.

Here are some useless examples:

```javascript
// example.js

var zither = require('./index');
var instruments = zither.instrument('test.zither');
var instruments2 = zither.instrument('test.zither2');
var _ = require('highland');
var through = require('through');

zither.pipe(through(function(buf) {
  this.queue(JSON.stringify(buf) + '\n');
})).pipe(process.stdout);

function main() {
  var eventCount = 0,
      totalEvents = 10,
      work,
      i;

  for (i = 0; i < totalEvents; i++) {
    instruments.recordEvent('test event');
    instruments2.recordEvent('secondEvent');
  }

  var work = instruments.work('foo.work.timer');

  work.start();

  setTimeout(work.stop.bind(work), 550);

}

main()
```
