var through = require('through');


var StreamObj = function(inputSource, type) {
  this.type = type;
  this.inputSource = inputSource;
  this._stream = through();
};

StreamObj.prototype.pipe = function(dst) {
  return this._stream.pipe(dst);
};

StreamObj.prototype.serialize = function() {
  var obj = {},
      attr;

  for (attr in this) {
    if (!(attr.indexOf('_') === 0) && this.hasOwnProperty(attr) && typeof this[attr] !== 'function') {
      obj[attr] = this[attr];
    }
  }
  return obj;
}

StreamObj.prototype.end = function() {
  this._stream.end();
};

StreamObj.prototype.queue = function(obj) {
  this._stream.queue(obj);
};

module.exports = StreamObj;
