import MyEventEmitter from './components/myEventEmitter.js';
import POS from './components/pos.js';
import Manager from './components/manager.js';
import Barista from './components/barista.js';
import DashBoard from './components/dashboard.js';

const eventEmitter = new MyEventEmitter();

const pos = new POS(eventEmitter);
const dashBoard = new DashBoard(eventEmitter);
const manager = new Manager(eventEmitter, pos);
const barista1 = new Barista(eventEmitter, '바리스타1');
const barista2 = new Barista(eventEmitter, '바리스타2');
manager.hireBaristas(barista1, barista2);

const setLayout = () => {
  const container = document.querySelector('.container');
  container.insertAdjacentHTML('beforeend', pos.getHTML());
  container.insertAdjacentHTML('beforeend', dashBoard.getHTML());
};

const setEvent = () => {
  pos.setDOMEvent();
};

const init = () => {
  setLayout();
  setEvent();
};

window.addEventListener('load', init);
