var through = require('through');


var StreamObj = function(inputSource, type) {
  this.type = type;
  this.inputSource = inputSource;
  this._stream = through();
  this.attrs = this.attrs.concat(['inputSource', 'type']);
};

StreamObj.prototype.pipe = function(dst) {
  return this._stream.pipe(dst);
};

StreamObj.prototype.get = function() {
  var obj = {},
      self = this;

  this.attrs.forEach(function(attr) {
    obj[attr] = self[attr];
  });

  return obj;
}

StreamObj.prototype.end = function() {
  this._stream.end();
};

StreamObj.prototype.queue = function(obj) {
  this._stream.queue(obj);
};

module.exports = StreamObj;
