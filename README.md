# zither

Zither is an simple and experimental tool that allows you to easily instrument your code, and react to instrumentation in multiple ways.

Here are some useless examples:

```javascript
// example.js
var _ = require('highland');
var through = require('through');

var zither = require('./index');
var instruments = zither.instrument('test.zither');
var instruments2 = zither.instrument('test.zither2');

var formatForConsole = through(function(buf) {
  this.queue(JSON.stringify(buf) + '\n');
});

var z1 = _(zither.pipe(through()));
var z2 = _(zither.pipe(through()));

// Print all timer events from the zither stream to the console
z1.where({type: 'timer'}).pipe(formatForConsole).pipe(process.stdout);


// Print all events from test.zither input stream to the console in uppercase
z2.where({inputSource: 'test.zither'}).pipe(through(function(buf) {
  this.queue(JSON.stringify(buf).toUpperCase() + '\n');
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

  work = instruments.work('foo.work.timer');
  work.start();
  setTimeout(work.stop.bind(work), 550);
}

main()
```

Output:
```
jirwin@shirley:~/projects/node-zither$ nodejs example.js 
FROM INPUT SOURCE TEST.ZITHER: {"NAME":"TEST EVENT","TIMESTAMP":1396648876749,"TYPE":"EVENT","INPUTSOURCE":"TEST.ZITHER"}
FROM INPUT SOURCE TEST.ZITHER: {"NAME":"TEST EVENT","TIMESTAMP":1396648876750,"TYPE":"EVENT","INPUTSOURCE":"TEST.ZITHER"}
FROM INPUT SOURCE TEST.ZITHER: {"NAME":"TEST EVENT","TIMESTAMP":1396648876750,"TYPE":"EVENT","INPUTSOURCE":"TEST.ZITHER"}
FROM INPUT SOURCE TEST.ZITHER: {"NAME":"TEST EVENT","TIMESTAMP":1396648876750,"TYPE":"EVENT","INPUTSOURCE":"TEST.ZITHER"}
FROM INPUT SOURCE TEST.ZITHER: {"NAME":"TEST EVENT","TIMESTAMP":1396648876751,"TYPE":"EVENT","INPUTSOURCE":"TEST.ZITHER"}
FROM INPUT SOURCE TEST.ZITHER: {"NAME":"TEST EVENT","TIMESTAMP":1396648876751,"TYPE":"EVENT","INPUTSOURCE":"TEST.ZITHER"}
FROM INPUT SOURCE TEST.ZITHER: {"NAME":"TEST EVENT","TIMESTAMP":1396648876752,"TYPE":"EVENT","INPUTSOURCE":"TEST.ZITHER"}
FROM INPUT SOURCE TEST.ZITHER: {"NAME":"TEST EVENT","TIMESTAMP":1396648876752,"TYPE":"EVENT","INPUTSOURCE":"TEST.ZITHER"}
FROM INPUT SOURCE TEST.ZITHER: {"NAME":"TEST EVENT","TIMESTAMP":1396648876753,"TYPE":"EVENT","INPUTSOURCE":"TEST.ZITHER"}
FROM INPUT SOURCE TEST.ZITHER: {"NAME":"TEST EVENT","TIMESTAMP":1396648876753,"TYPE":"EVENT","INPUTSOURCE":"TEST.ZITHER"}
from input source test.zither2: {"name":"foo.work.timer","startTime":1396648876753,"endTime":null,"duration":null,"state":"start","type":"timer","inputSource":"test.zither2"}
from input source test.zither2: {"name":"foo.work.timer","startTime":1396648876753,"endTime":1396648877305,"duration":552,"state":"end","type":"timer","inputSource":"test.zither2"}
```

