var util = require('util');
var EventEmitter = require('events').EventEmitter;

var timers = {};

var Timer = function(label) {
  this.label = label;
  this.startTime = Date.now();
  this.endTime = null;
  this.duration = null;

  EventEmitter.call(this);
};
util.inherits(Timer, EventEmitter);

Timer.prototype.start = function() {
  this.startTime = Date.now();
};

Timer.prototype.stop = function() {
  this.endTime = Date.now();
  this.duration = this.endTime - this.startTime;
  this.emit('stop', this);
};

exports.Timer = Timer;
