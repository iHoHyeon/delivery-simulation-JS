import MyEventEmitter from './class/myEventEmitter.js';
import POS from './class/pos.js';
import Manager from './class/manager.js';
import Barista from './class/barista.js';

const eventEmitter = new MyEventEmitter();
eventEmitter.on('addOrder', () => console.log('addOrder'));

const pos = new POS(eventEmitter);
const manager = new Manager(eventEmitter, pos);
const barista1 = new Barista(eventEmitter);
const barista2 = new Barista(eventEmitter);
manager.hireBaristas(barista1, barista2, barista1, '123');

pos.addOrder({ A: { 아메리카노: 1, 바닐라라떼: 2 } });
pos.addOrder({ B: { 아메리카노: 2 } });
