/*
  DashBoards는 메뉴 제작 현황을 주기적으로 화면에 출력
*/

export default class DashBoard {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;

    eventEmitter.on('finishOrder', (order) => console.log('finishOrder', order));
    eventEmitter.on('startMaking', (customer, menu, count, name) => console.log('startMaking', customer, menu, count, `by ${name}`));
    eventEmitter.on('finishMaking', (customer, menu, count, name) => console.log('finishMaking', customer, menu, count, `by ${name}`));
  }
}
