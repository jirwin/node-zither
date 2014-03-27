var events = {};

var Event = function(label) {
  this.label = label;
  this.marks = [];
  this.timestamp = null;
};


Event.prototype.record = function() {
  var now = Date.now();

  this.marks.push(now);
  this.timestamp = now;
};


var getEvent = function(eventName) {
  var event;

  event = events[eventName];

  if (!event) {
    event = new Event(eventName);
    events[eventName] = event;
  }

  return event;
};


exports.Event = Event;
exports.getEvent = getEvent;
