var util = require('util');
var StreamObj = require('./stream_object');


var Event = function(inputSource, name) {
  this.name = name;
  this.timestamp = Date.now();

  StreamObj.call(this, inputSource, 'event');
};
util.inherits(Event, StreamObj);

Event.prototype.mark = function() {
  this.queue(this.serialize());
};

module.exports = Event;
