var StatsD = require('node-statsd').StatsD;
var Writable = require('stream').Writable;
var util = require('util');

var statsdClients = {};


/**
 * A writable stream that acts as a statsd sink for the zither instrument input sources.
 * @param {Obj} options Statsd client options. See https://github.com/sivy/node-statsd for options.
 *                      Additionally you can include sampleRate to control how Statsd samples data.
 *                      sampleRate defaults to 1.
 */
var ZitherStatsd = function(options) {
  this.host = options.host || 'localhost';
  this.port = options.port || 8125;

  if (!statsdClients[host + ':' + port]) {
    statsdClients[host + ':' + port] = new StatsD(options);
  }

  this.client = statsdClients[host + ':' + port];
  this.sampleRate = options.sampleRate || 1;

  Writable.call(this, {objectMode: true});
};
util.inherits(ZitherStatsd, Writable);


/**
 * Implements Writable._write for the stream interface.
 * Dispatches various input source types to statsd.
 */
ZitherStatsd.prototype._write = function(obj, enc, callback) {
  console.dir(obj);
  if (obj.type === 'event') {
    this.client.increment(obj.name, this.sampleRate);
  } else if (obj.type === 'gauge') {
    this.client.gauge(obj.name, obj.value, this.sampleRate);
  } else if (obj.type === 'timer' && obj.state === 'end') {
    this.client.timing(obj.name, obj.duration, this.sampleRate);
  }

  process.nextTick(callback);
};


exports.ZitherStatsd = ZitherStatsd;
