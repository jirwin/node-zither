var Gauge = function(module, label) {
  this.module = module;
  this.label = label;
  this.value = null;
};

Gauge.prototype.get = function() {
  return {
    module: this.module,
    label: this.label,
    type: 'gauge',
    timestamp: Date.now(),
    value: this.value
  }
};

Gauge.prototype.set = function(value) {
  this.value = value;
  return this.get();
};


module.exports = Gauge;
