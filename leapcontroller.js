const Leap = require('leapjs');
const sendEvent = require('./websocket');

const getHandHeight = yValue => {
  let [minValue, maxValue] = [100,300];
  if (yValue <= minValue) return 0;
  if (yValue >= maxValue) return 100;
  return (yValue - minValue) / 2;
}

// yValue max = 1 (backhand), min = -1 (forehand)
const getHandRotation = yValue => {
  const normalisedvalue = Math.abs(-(yValue + 1));
  if ( normalisedvalue === 0 ) return 0;
  return normalisedvalue * 50;
}

let i = 0;
const framesToSkip = 6;
const gestureController = Leap.loop({enableGestures: true}, (frame) => {
  if (i === framesToSkip && frame.hands.length && frame.hands[0].pinchStrength > .8) {
    sendEvent('brightness', {value: getHandRotation(frame.hands[0].palmNormal[1])});
  }
  i += 1;
  if (i === framesToSkip+1) i = 0;
});

module.exports = gestureController;