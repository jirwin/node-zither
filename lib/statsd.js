var StatsD = require('node-statsd').StatsD;
var Writable = require('stream').Writable;
var util = require('util');

var statsdClients = {};

var ZitherStatsd = function(options) {
  var hostPort = options.host + ':' + options.port;

  if (!statsdClients[hostPort]) {
    statsdClients[hostPort] = new StatsD(options);
  }

  this.client = statsdClients[hostPort];
  this.sampleRate = options.sampleRate || 1;

  Writable.call(this, {objectMode: true});
};
util.inherits(ZitherStatsd, Writable);


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
