var events = {};

function Event(label, slotInterval) {
  this.label = label;
  this.records = [];
  this.metrics = {};
  this.slotInterval = slotInterval || 10000;

  setInterval(this.flush.bind(this), this.slotInterval);
};

Event.prototype.getSlotTime = function(timestamp) {
  return timestamp - (timestamp % this.slotInterval);
};

Event.prototype.record = function() {
  this.records.push(Date.now());
};

Event.prototype.getCount = function() {
  return this.records.length;
};

Event.prototype.getCountPerSecond = function() {
  var count = this.getCount(),
      beginning = this.records[0],
      end = this.records[count - 1];

  return count / ((end - beginning) / 1000);
};

Event.prototype.saveCountPerSecond = function() {
  var now = Date.now();

  this.metrics[this.getSlotTime(now)] = this.getCountPerSecond();
};

Event.prototype.flush = function() {
  this.saveCountPerSecond();
  this.records = [];
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
