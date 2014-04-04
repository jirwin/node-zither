var through = require('through');
var _ = require('highland');

var InputSource = function(id, zStream) {
  this.stream = through();
  this.id = id;

  this.stream.setMaxListeners(0);
  zStream.queue(_(this.stream));
};

InputSource.prototype.end = function() {
  this.stream.queue(_.nil);
};

InputSource.prototype.pipe = function(dst) {
  return _(this.stream).observe().pipe(dst);
};

exports.InputSource = InputSource;
