var StatsD = require('node-statsd').StatsD;

var client = null;

var ZStatsD = function(options) {
  var options = options || {};

  this.sample = options.sample;

  if (!client) {
    client = new StatsD(options);
  }
};

ZStatsD.prototype.event = function(event, callback) {
  client.increment(event.label, 1, this.sample, callback);
};

ZStatsD.prototype.timer = function(timer, callback) {
  client.timing(timer.label, timer.duration, this.sample, callback);
};

ZStatsD.prototype.gauge = function(gauge, callback) {
  client.gauge(gauge.label, gauge.value, this.sample, callback);
};

exports.StatsD = ZStatsD;
