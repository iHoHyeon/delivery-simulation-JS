export default class POS {
  static instance;
  constructor(eventEmitter) {
    if (POS.instance) return POS.instance;
    POS.instance = this;

    this.eventEmitter = eventEmitter;
    this.orderQueue = [];
  }

  addOrder(order) {
    this.orderQueue.push(order);
    this.eventEmitter.emit('addOrder');
  }
}
