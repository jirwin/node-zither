var util = require('util');
var StreamObj = require('./stream_object');


var Gauge = function(inputSource, name) {
  this.name = name;
  this.timestamp = Date.now();

  StreamObj.call(this, inputSource, 'gauge');
};
util.inherits(Gauge, StreamObj);


Gauge.prototype.set = function(value) {
  this.value = value;
  this.queue(this.serialize());
};

module.exports = Gauge;
