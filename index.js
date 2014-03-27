var async = require('async');

var getEvent = require('./lib/event').getEvent;
var Timer = require('./lib/timer').Timer;

var handlers = {
  events: [],
  timers: []
};

var moduleHandlers = {
};


function Zither(moduleName) {
  this.moduleName = moduleName;
  this.events = {};

  moduleHandlers[moduleName] = {
    events: [],
    timers: []
  };
};

Zither.prototype.dispatchHandlers = function(type, obj) {
  var errs = [],
      objHandlers = [];

  function captureHandlerErrors(callback) {
    return function() {
      var args = Array.prototype.slice.call(arguments);

      if (args[0]) {
        errs.push(args[0]);
        args = args.splice(0, 1, null);
      }

      callback.apply(null, args);
    };
  }

  objHandlers = objHandlers.concat(handlers[type], moduleHandlers[this.moduleName][type]);

  async.each(objHandlers, function(objHandler, callback) {
    callback = captureHandlerErrors(callback);

    try {
      objHandler(obj, callback);
    } catch (err) {
      callback(err);
      return;
    }
  }, function(err) {
    if (errs.length) {
      console.log('Error calling handler', eventErrs[0]);
    }
  });

};

Zither.prototype.recordEvent = function(label) {
  var event = getEvent([this.moduleName, label].join(':'));

  event.record();

  this.dispatchHandlers('events', event);
};

Zither.prototype.work = function(label) {
  var self = this,
      workTimer = new Timer(label);

  workTimer.once('stop', function(timer) {
    self.dispatchHandlers('timers', timer);
  });

  return workTimer;
};

Zither.prototype.registerPlugin = function(plugin) {
  if (plugin.hasOwnProperty('event') && typeof plugin.event === 'function') {
    moduleHandlers[this.moduleName].events.push(plugin.event);
  }

  if (plugin.hasOwnProperty('timer') && typeof plugin.timer === 'function') {
    moduleHandlers[this.moduleName].timers.push(plugin.timer);
  }
};

exports.instrument = function(modulename) {
  var zither = new Zither(modulename);

  return zither;
};

exports.registerPlugin = function(plugin) {
  if (plugin.hasOwnProperty('event') && typeof plugin.event === 'function') {
    handlers.events.push(plugin.event);
  }

  if (plugin.hasOwnProperty('timer') && typeof plugin.timer === 'function') {
    handlers.timers.push(plugin.timer);
  }
}
