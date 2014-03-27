# zither

Zither is an simple and experimental tool that allows you to easily instrument your code, and react to instrumentation in multiple ways.

Here are some useless examples:

```javascript
// example.js

var zither = require('zither');
var instruments = zither.instrument('zither.example');
var ex2 = require('./example2').example2;

// Register a basic console plugin for each type that is global
zither.register({
  event: function(event, callback) {
    console.log(event.label, event.timestamp);
    process.nextTick(callback);
  },

  timer: function(timer, callback) {
    console.log(timer.label, timer.duration);
    process.nextTick(callback);
  },

  gauge: function(gauge, callback) {
    console.log(gauge.label, gauge.value);
    process.nextTick(callback);
  }
});

// Register the StatsD plugin globally
zither.register(new zither.StatsD());

function main() {
  setInterval(function() {
    instruments.recordEvent('some.event');
    ex2();
  }, 500);
}

main();
```

```javascript
// example2.js

// zither is scoped to the module
var instruments = require('zither').instrument('zither.example2');

// When you call instruments.register(), it registers the plugin only for the current module
instruments.register({
  event: function(event, callback) { // This will only happen on events recorded in this module
    console.log('secondary plugin', event.label);
    process.nextTick(callback);
  }
});

function example2() {
  var work = instruments.work('example2.work');

  instruments.recordEvent('example2.event');
  work.start();

  // When work.stop() is called, the timer is fired to each timer handler
  setTimeout(work.stop.bind(work), Math.random() * 10000 + 1000);
  instruments.setGauge('ex2.gauge', Math.random() * 1000);
}

exports.example2 = example2;
```

## Feature Hopefuls
* Sampling
* Metric queues
* Alerting?
