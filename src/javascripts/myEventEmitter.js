export default class MyEventEmitter {
  constructor() {
    this.onListner = new Map();
  }

  on(eventName, listener) {
    if (typeof eventName !== 'string' && typeof eventName !== 'symbol') throw Error('event name should be string or symbol type');
    if (typeof listener !== 'function') throw Error('listener should be function');
    this.onListner.set(eventName, [...(this.onListner.get(eventName) ?? []), listener]);
    this.emit('newListner');
    return this;
  }

  emit(eventName, ...args) {
    if (this.onListner.get(eventName)) {
      this.onListner.get(eventName).forEach((fn) => fn(...args));
      return true;
    }
    return false;
  }
}
