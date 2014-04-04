# zither

Zither is an simple and experimental tool that allows you to easily instrument your code, and react to instrumentation in multiple ways.

Here are some useless examples:

```javascript
// example.js

var zither = require('./index');
var instruments = zither.instrument('test.zither');
var instruments2 = zither.instrument('test.zither2');
var _ = require('highland');
var through = require('through');

zither.pipe(through(function(buf) {
  this.queue(JSON.stringify(buf) + '\n');
})).pipe(process.stdout);

function main() {
  var eventCount = 0,
      totalEvents = 10,
      work,
      i;

  for (i = 0; i < totalEvents; i++) {
    instruments.recordEvent('test event');
    instruments2.recordEvent('secondEvent');
  }

  var work = instruments.work('foo.work.timer');

  work.start();

  setTimeout(work.stop.bind(work), 550);

}

main()
```

Output:
```
jirwin@shirley:~/projects/node-zither$ nodejs example.js 
{"name":"test event","timestamp":1396646169595,"inputSource":"test.zither","type":"event"}
{"name":"secondEvent","timestamp":1396646169596,"inputSource":"test.zither2","type":"event"}
{"name":"test event","timestamp":1396646169596,"inputSource":"test.zither","type":"event"}
{"name":"secondEvent","timestamp":1396646169597,"inputSource":"test.zither2","type":"event"}
{"name":"test event","timestamp":1396646169597,"inputSource":"test.zither","type":"event"}
{"name":"secondEvent","timestamp":1396646169597,"inputSource":"test.zither2","type":"event"}
{"name":"test event","timestamp":1396646169597,"inputSource":"test.zither","type":"event"}
{"name":"secondEvent","timestamp":1396646169597,"inputSource":"test.zither2","type":"event"}
{"name":"test event","timestamp":1396646169597,"inputSource":"test.zither","type":"event"}
{"name":"secondEvent","timestamp":1396646169597,"inputSource":"test.zither2","type":"event"}
{"name":"test event","timestamp":1396646169597,"inputSource":"test.zither","type":"event"}
{"name":"secondEvent","timestamp":1396646169597,"inputSource":"test.zither2","type":"event"}
{"name":"test event","timestamp":1396646169597,"inputSource":"test.zither","type":"event"}
{"name":"secondEvent","timestamp":1396646169597,"inputSource":"test.zither2","type":"event"}
{"name":"test event","timestamp":1396646169597,"inputSource":"test.zither","type":"event"}
{"name":"secondEvent","timestamp":1396646169597,"inputSource":"test.zither2","type":"event"}
{"name":"test event","timestamp":1396646169598,"inputSource":"test.zither","type":"event"}
{"name":"secondEvent","timestamp":1396646169598,"inputSource":"test.zither2","type":"event"}
{"name":"test event","timestamp":1396646169598,"inputSource":"test.zither","type":"event"}
{"name":"secondEvent","timestamp":1396646169599,"inputSource":"test.zither2","type":"event"}
{"name":"foo.work.timer","startTime":1396646169599,"endTime":null,"duration":null,"state":"start","inputSource":"test.zither","type":"timer"}
{"name":"foo.work.timer","startTime":1396646169599,"endTime":1396646170151,"duration":552,"state":"end","inputSource":"test.zither","type":"timer"}
```

