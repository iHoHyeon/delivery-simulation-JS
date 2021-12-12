import { DASHBOARD_OUTPUT, DASHBOARD_LOG_CLASS } from '../constant.js';

export default class DashBoard {
  list;

  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    this.time = 0;
    this.timerId;

    eventEmitter.on('addOrder', this.addLog('addOrder').bind(this));
    eventEmitter.on('finishOrder', this.addLog('finishOrder').bind(this));
    eventEmitter.on('startMaking', this.addLog('startMaking').bind(this));
    eventEmitter.on('finishMaking', this.addLog('finishMaking').bind(this));
  }

  getHTML() {
    setTimeout(() => this.setTimer());
    return `
    <div class="dashboard board">
      <div class="dash">
        <div class="label">대시보드</div>
        <div class="timer">00:00</div>
        <ul class="list">
          <li> * 영업을 시작했습니다 * </li>
        </ul>
      </div>
    </div>
    `;
  }

  addLog(type) {
    return function (...args) {
      if (!this.list) this.list = document.querySelector('.dashboard .list');
      if (type === 'addOrder' || type === 'finishOrder') args = Object.entries(args[0])[0];
      this.list.insertAdjacentHTML(
        'beforeend',
        `<li>
          <span class="${DASHBOARD_LOG_CLASS[type]}">${DASHBOARD_OUTPUT[type](...args)}</span>
          <span class="time">${this.getTimerInterface()}</span>
        </li>`
      );
      this.list.scrollTop = this.list.scrollHeight;
    };
  }

  setTimer() {
    const timerElement = document.querySelector('.timer');
    this.timerId = setInterval(() => {
      this.time += 1;
      timerElement.innerHTML = this.getTimerInterface();
    }, 2000);
  }

  getTimerInterface() {
    const makeTimerInterface = (num) => String(parseInt(num)).padStart(2, '0');
    return `${makeTimerInterface(this.time / 60)}:${makeTimerInterface(this.time % 60)}`;
  }
}
