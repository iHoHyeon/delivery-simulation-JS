import { MENU_TIME } from '../constant.js';

export default class Barista {
  constructor(eventEmitter, name) {
    this.eventEmitter = eventEmitter;
    this.name = name;

    this.nowMaking = new Map();
    this.makingSkill = { 아메리카노: Barista.makingAmericano, 바닐라라떼: Barista.makingVanillaLatte, 허니브레드: Barista.makingHoneyBread };
  }

  async startMaking(customer, detail) {
    const [menu, count] = detail;

    this.nowMaking.set(detail, { customer, menu, count });
    this.eventEmitter.emit('startMaking', customer, menu, count, this.name);
    await this.makingSkill[menu](count);

    return this.finishMaking(detail, customer, menu, count);
  }

  finishMaking(detail, customer, menu, count) {
    this.nowMaking.delete(detail);
    this.eventEmitter.emit('finishMaking', customer, menu, count, this.name);
  }

  static makingAmericano = (count) =>
    new Promise((res) => {
      setTimeout(res, MENU_TIME['아메리카노'] * count);
    });
  static makingVanillaLatte = (count) =>
    new Promise((res) => {
      setTimeout(res, MENU_TIME['바닐라라떼'] * count);
    });
  static makingHoneyBread = (count) =>
    new Promise((res) => {
      setTimeout(res, MENU_TIME['허니브레드'] * count);
    });
}
