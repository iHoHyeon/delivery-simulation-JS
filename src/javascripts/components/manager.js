import Barista from './barista.js';
import Rider from './riders.js';

export default class Manager {
  static instance;
  constructor(eventEmitter, pos) {
    if (Manager.instance) return Manager.instance;
    Manager.instance = this;

    this.eventEmitter = eventEmitter;
    this.pos = pos;
    this.finishedOrders = [];

    this.baristas = new Set();
    this.riders = new Set();

    this.eventEmitter.on('addOrder', this.checkOrderQueue.bind(this));
    this.eventEmitter.on('finishMaking', this.checkOrderQueue.bind(this));
    this.eventEmitter.on('finishOrder', this.addFinishedOrders.bind(this));
    this.eventEmitter.on('finishOrder', this.checkFinishedOrderQueue.bind(this));
  }

  hireBaristas(...baristas) {
    baristas.forEach((barista) => {
      if (barista instanceof Barista) this.baristas.add(barista);
    });
  }

  hireRiders(...riders) {
    riders.forEach((rider) => {
      if (rider instanceof Rider) this.riders.add(rider);
    });
  }

  async checkOrderQueue() {
    const order = this.pos.orderQueue[0];

    if (!order) return;

    this.pos.orderQueue.shift();
    const [customer, detailsObj] = Object.entries(order)[0];
    const menuQueue = Object.entries(detailsObj);

    await Promise.all(menuQueue.map((menuOrder) => this.orderLooper(customer, menuOrder)));

    this.eventEmitter.emit('finishOrder', order);
  }

  async checkFinishedOrderQueue() {
    console.log(this.riders);
    console.log('checkFinishedOrder');
    const order = this.finishedOrders[0];

    if (!order) return;

    this.finishedOrders.shift();

    await this.finishedOrderLooper(order);
  }

  orderLooper(customer, menuOrder) {
    return new Promise((res, rej) => {
      try {
        const timerId = setInterval(() => {
          const posibleBaristar = this.getPosibleBarista();
          if (posibleBaristar) {
            clearInterval(timerId);
            res(posibleBaristar.startMaking(customer, menuOrder));
          }
        }, 0);
      } catch (err) {
        console.error(err);
        rej();
      }
    });
  }

  finishedOrderLooper(order) {
    return new Promise((res, rej) => {
      try {
        const timerId = setInterval(() => {
          const posibleRider = this.getPosibleRider();
          if (posibleRider) {
            clearInterval(timerId);
            res(posibleRider.startRiding(order));
          }
        }, 0);
      } catch (err) {
        console.error(err);
        rej();
      }
    });
  }

  getPosibleBarista() {
    let posibleBarista;
    [...this.baristas].some((barista) => {
      if (!barista.nowMaking.size) posibleBarista = barista;
      return !barista.nowMaking.size;
    });

    return posibleBarista;
  }

  getPosibleRider() {
    let posibleRider;
    [...this.riders].some((rider) => {
      if (!rider.nowRiding) posibleRider = rider;
      return !rider.nowRiding;
    });

    return posibleRider;
  }

  addFinishedOrders(order) {
    this.finishedOrders = [...this.finishedOrders, order];
  }
}
