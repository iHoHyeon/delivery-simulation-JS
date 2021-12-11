export default class MyEventEmitter {
  constructor() {
    this.onListner = new Map();
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') throw Error('listener should be function');
    this.onListner.set(eventName, [...(this.onListner.get(eventName) ?? []), listener]);
    this.emit('newListner');
    return this;
  }

  emit(eventName) {
    if (this.onListner.get(eventName)) {
      this.onListner.get(eventName).forEach((fn) => fn());
      return true;
    }
    return false;
  }
}
