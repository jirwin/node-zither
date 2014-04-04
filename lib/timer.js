var util = require('util');
var through = require('through');
var StreamObj = require('./stream_object');


var Timer = function(inputSource, name) {
  this.name = name;
  this.startTime = null;
  this.endTime = null;
  this.duration = null;
  this.state = null;

  StreamObj.call(this, inputSource, 'timer');
};
util.inherits(Timer, StreamObj);

Timer.prototype.start = function() {
  this.startTime = Date.now();
  this.state = 'start';
  this.queue(this.serialize());
};

Timer.prototype.stop = function() {
  this.endTime = Date.now();
  this.duration = this.endTime - this.startTime;
  this.state = 'end';
  this.queue(this.serialize());
};

Timer.prototype.pipe = function(dst) {
  return this._stream.pipe(dst);
}

module.exports = Timer;
