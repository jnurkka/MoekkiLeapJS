const Leap = require('leapjs');

Leap.loop({ host: '192.168.178.43', enableGestures: true, loopWhileDisconnected: false }, (frame) => {
  console.log(frame);
});