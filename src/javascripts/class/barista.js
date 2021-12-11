/*
  바리스타

  startMaking: async함수로 비동기 병렬처리
*/
import { MENU_TIME } from '../constant.js';

const makingAmericano = (count) =>
  new Promise((res) => {
    setTimeout(res, 1000 * count);
  });
const makingVanillaLatte = (count) =>
  new Promise((res) => {
    setTimeout(res, 2000 * count);
  });
const makingHoneyBread = (count) =>
  new Promise((res) => {
    setTimeout(res, 5000 * count);
  });

export default class Barista {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    this.nowMaking = new Map();
    this.makingSkill = { 아메리카노: makingAmericano, 바닐라라떼: makingVanillaLatte, 허니브레드: makingHoneyBread };
  }

  async startMaking(customer, detail) {
    const [menu, count] = detail;

    this.nowMaking.set(detail, { customer, menu, count });
    await this.makingSkill[menu](count);
    this.nowMaking.delete(detail);
    console.log('finishMaking', customer, menu, count);
    this.eventEmitter.emit('finishMaking');
    return;
  }
}
