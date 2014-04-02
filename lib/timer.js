var util = require('util');
var EventEmitter = require('events').EventEmitter;


var Timer = function(module, label) {
  this.module = module;
  this.label = label;
  this.startTime = null;
  this.endTime = null;
  this.duration = null;

  EventEmitter.call(this);
};
util.inherits(Timer, EventEmitter);

Timer.prototype.get = function(type) {
  return {
    module: this.module,
    label: this.label,
    type: type || 'timer.update',
    startTime: this.startTime,
    endTime: this.endTime,
    duration: this.duration || Date.now() - this.startTime
  };
};

Timer.prototype.start = function() {
  this.startTime = Date.now();

  return this.get('timer.start');
};

Timer.prototype.stop = function() {
  this.endTime = Date.now();
  this.duration = this.endTime - this.startTime;
  this.emit('stop', this.get('timer.end'));
};


module.exports = Timer;
