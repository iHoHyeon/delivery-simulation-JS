import { DASHBOARD_OUTPUT } from '../constant.js';

export default class DashBoard {
  list;

  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;

    eventEmitter.on('addOrder', this.addLog('addOrder').bind(this));
    eventEmitter.on('finishOrder', (order) => console.log('finishOrder', order));
    eventEmitter.on('startMaking', (customer, menu, count, baristaName) => console.log('startMaking', customer, menu, count, `by ${baristaName}`));
    eventEmitter.on('finishMaking', (customer, menu, count, baristaName) => console.log('finishMaking', customer, menu, count, `by ${baristaName}`));
  }

  getHTML() {
    return `
    <div class="dashboard board">
      <div class="dash">
        <div class="label">대시보드</div>
        <ul class="list">
          <li>현황</li>
          <li>현황</li>
          <li>현황</li>
          <li>현황</li>
          <li>현황</li>
        </ul>
      </div>
    </div>
    `;
  }

  addLog(type) {
    return function (...args) {
      if (!this.list) this.list = document.querySelector('.dashboard .list');
      if (type === 'addOrder' || type === 'finishOrder') args = Object.entries(args[0])[0];
      this.list.insertAdjacentHTML('beforeend', `<li>${DASHBOARD_OUTPUT[type](...args)}</li>`);
    };
  }
}
