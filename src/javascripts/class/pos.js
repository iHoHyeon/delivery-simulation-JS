export default class POS {
  static instance;
  constructor(eventEmitter) {
    if (POS.instance) return POS.instance;
    POS.instance = this;

    this.eventEmitter = eventEmitter;
    this.orderQueue = [];
  }

  addOrder(...orders) {
    this.orderQueue.push(...orders);
    this.eventEmitter.emit('addOrder');
  }
}
