var through = require('through');


/**
 * A zither filter that does strict equaliy.
 * Provided a filter object, only match if every key in the filter
 * matches the event.
 */
exports.StrictEquality = function(filter) {
  return through(function(event) {
    var match = true;

    Object.keys(filter).forEach(function(key) {
      if (filter[key] === event[key]) {
        match = match && true
      } else {
        match = false;
      }
    });

    if (match) {
      this.queue(event);
    }
  });
};
