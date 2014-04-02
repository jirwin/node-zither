var async = require('async');
var through = require('through');

var Event = require('./lib/event');
var Gauge = require('./lib/gauge');
var Timer = require('./lib/timer');

var zStream = null;


function Zither(module) {
  this.module = module;
};

Zither.prototype.recordEvent = function(label) {
  var event = new Event(this.module, label);

  zStream.queue(event.get());
};

Zither.prototype.setGauge = function(label, value) {
  var gauge = new Gauge(this.module, label);

  zStream.queue(gauge.set(value));
};

Zither.prototype.work = function(label) {
  var self = this,
      workTimer = new Timer(this.module, label);

  workTimer.once('stop', function(timer) {
    zStream.queue(timer);
  });

  zStream.queue(workTimer.start());
  return workTimer;
};


exports.instrument = function(module) {
  var zither = new Zither(module);

  return zither;
};

exports.createStream = function() {
  if (!zStream) {
    zStream = through();
  }

  return zStream;
};


exports.StatsD = require('./lib/statsd').StatsD;
