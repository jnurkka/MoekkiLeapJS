const sendEvent = require('./websocket');
const gestureController = require('./leapcontroller');

const getSwipeDirection = gesture => {
  if (gesture.direction[0] > 0) return 'right';
  return 'left';
}

let interactionsBlocked = false;

gestureController.on('gesture', gesture => {
  if (!interactionsBlocked && gesture.type === 'keyTap') {
    interactionsBlocked = true;
    sendEvent('power');
    setTimeout(() => {
      interactionsBlocked = false;
    }, 2000);
  }
  if (!interactionsBlocked && gesture.type === 'swipe' && gesture.state === 'start') {
    interactionsBlocked = true;
    sendEvent('swipe', { value: getSwipeDirection(gesture)})
    setTimeout(() => {
      interactionsBlocked = false;
    }, 2000);
  }
});