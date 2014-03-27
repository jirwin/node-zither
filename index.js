var async = require('async');

var getEvent = require('./lib/event').getEvent;

var handlers = {
  events: [],
  timers: []
};


function Zither(modulename) {
  this.modulename = modulename;
  this.events = {};
};

Zither.prototype.recordEvent = function(label) {
  var event = getEvent([this.modulename, label].join(':'));

  event.record();

  async.each(handlers.events, function(eventHandler, callback) {
    eventHandler(event, callback);
  }, function(err) {
    if (err) {
      console.log('Error calling event handler', err);
    }
  });

  console.log(event.metrics);
};

exports.instrument = function(modulename) {
  var zither = new Zither(modulename);

  return zither;
};

exports.registerPlugin = function(plugin) {
  if (plugin.hasOwnProperty('event')) {
    handlers.events.push(plugin.event);
  }

  if (plugin.hasOwnProperty('timer')) {
    handlers.timers.push(plugin.timer);
  }
}
