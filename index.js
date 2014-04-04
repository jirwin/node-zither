var through = require('through');
var _ = require('highland');

var Instrument = require('./lib/instrument').Instrument;

var inputStreams = through();
var zStream = _(inputStreams).merge();

zStream.resume();

// The main stream won't start flowing until it directly has something attached to it.
// Observers don't count.
zStream.pipe(through());

exports.instrument = function(id) {
  var zither = new Instrument(id, inputStreams);
  return zither;
};

exports.pipe = function(dst) {
  return zStream.observe().pipe(dst);
};
