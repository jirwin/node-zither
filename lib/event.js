var Event = function(module, label) {
  this.module = module;
  this.label = label;
};

Event.prototype.get = function() {
  return {
    module: this.module,
    label: this.label,
    type: 'event',
    timestamp: Date.now()
  }
};


module.exports = Event;
