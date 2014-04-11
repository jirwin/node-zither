var util = require('util');

var _ = require('highland');

var InputSource = require('./input_source').InputSource;
var Event = require('./event');
var Timer = require('./timer');
var Gauge = require('./gauge');


var Instrument = function(id, zStream) {
  InputSource.call(this, id, zStream);
}
util.inherits(Instrument, InputSource);

Instrument.prototype.recordEvent = function(name) {
  var event = new Event(this.id, name);

  event.pipe(this.stream);
  event.mark();
  return event;
};

Instrument.prototype.work = function(name) {
  var timer = new Timer(this.id, name);

  timer.pipe(this.stream);
  return timer;
};

Instrument.prototype.setGauge = function(name, value) {
  var gauge = new Gauge(this.id, name);

  gauge.pipe(this.stream);
  gauge.set(value);

  return gauge;
};

Instrument.prototype.measureWork = function(name, delta) {
  var timer = new Timer(this.id, name);

  timer.pipe(this.stream);
  timer.measureWork(delta);
  return timer;
};

exports.Instrument = Instrument;
