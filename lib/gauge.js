var gauges = {};

var Gauge = function(label) {
  this.label = label;
  this.marks = [];
  this.timestamp = null;
  this.value = null;
};


Gauge.prototype.set = function(value) {
  var now = Date.now();

  this.marks.push({
    timestamp: now,
    value: value
  });
  this.timestamp = now;
  this.value = value;
};


var getGauge = function(gaugeName) {
  var gauge;

  gauge = gauges[gaugeName];

  if (!gauge) {
    gauge = new Gauge(gaugeName);
    gauges[gaugeName] = gauge;
  }

  return gauge;
};


exports.Gauge = Gauge;
exports.getGauge = getGauge;
