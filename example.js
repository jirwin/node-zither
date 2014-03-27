var zither = require('./index');
var instruments = zither.instrument('zither.example');

zither.registerPlugin({
  event: function(event, callback) {
    console.log('Got an event');
    console.dir(event.records.length);
    process.nextTick(callback);
  },

  timer: function(timer, callback) {
    console.log('Got a timer');
    console.dir(timer);
    process.nextTick(callback);
  }
});

function main() {
  var i;

  setInterval(function() {
    instruments.recordEvent('some.event');
  }, 500);
}

main();
