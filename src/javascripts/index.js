import MyEventEmitter from './class/myEventEmitter.js';
import POS from './class/pos.js';
import Manager from './class/manager.js';
import Barista from './class/barista.js';
import DashBoard from './class/dashboard.js';

const eventEmitter = new MyEventEmitter();

const pos = new POS(eventEmitter);
const dashBoard = new DashBoard(eventEmitter);
const manager = new Manager(eventEmitter, pos);
const barista1 = new Barista(eventEmitter, '바리스타1');
const barista2 = new Barista(eventEmitter, '바리스타2');
const barista3 = new Barista(eventEmitter, '바리스타3');
const barista4 = new Barista(eventEmitter, '바리스타4');
const barista5 = new Barista(eventEmitter, '바리스타5');
manager.hireBaristas(barista1, barista2, barista3, barista4, barista5);

const testOrder = () => {
  pos.addOrder({ A: { 아메리카노: 2, 바닐라라떼: 1, 허니브레드: 2 } });
  pos.addOrder({ B: { 아메리카노: 4 } });
  pos.addOrder({ C: { 아메리카노: 2 } });
  pos.addOrder({ D: { 아메리카노: 1 } });
  pos.addOrder({ E: { 허니브레드: 1 } });
};

testOrder();
