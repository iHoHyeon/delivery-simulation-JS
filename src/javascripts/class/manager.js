/*
  매니저는 주기적으로 주문 대기큐에서 이벤트를 확인

  hireBaristas : 매니저는 바리스타를 고용할 수 있다.

  checkOrderQueue : 매니저는 본인이 관리하는 pos의 orderQueue를 확인해서 바리스타에게 일을 맡길 수 있다.
  => addOrder, finishMaking 이벤트 리스너로 등록되어있다 
*/
import Barista from './barista.js';

export default class Manager {
  static instance;
  constructor(eventEmitter, pos) {
    if (Manager.instance) return Manager.instance;
    Manager.instance = this;

    this.eventEmitter = eventEmitter;
    this.pos = pos;
    this.baristas = new Set();
    this.eventEmitter.on('addOrder', this.checkOrderQueue.bind(this));
    this.eventEmitter.on('finishMaking', this.checkOrderQueue.bind(this));
  }

  hireBaristas(...baristas) {
    baristas.forEach((barista) => {
      if (barista instanceof Barista) this.baristas.add(barista);
    });
  }

  async checkOrderQueue() {
    const order = this.pos.orderQueue.shift();
    let posibleBarista;

    if (!order) return;

    [...this.baristas].some((barista) => {
      if (!barista.nowMaking.size) posibleBarista = barista;
      return !barista.nowMaking.size;
    });

    if (posibleBarista) {
      console.log(order);
      console.log(posibleBarista);
      const [customer, detailsObj] = Object.entries(order)[0];
      const details = Object.entries(detailsObj);
      await Promise.all(details.map((detail) => posibleBarista.startMaking(customer, detail)));

      console.log(customer, 'finishOrder');
      this.eventEmitter.emit('finsihOrder', order);
    }
  }
}
