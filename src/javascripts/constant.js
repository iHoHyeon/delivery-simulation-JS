export const MENU_TIME = { 아메리카노: 1000, 바닐라라떼: 2000, 허니브레드: 5000 };

export const DASHBOARD_OUTPUT = {
  addOrder: (customer, menu) => `${customer}님의 주문이 접수되었습니다. (${menuToLog(menu)})`,
  finishOrder: (customer, menu) => `${customer}님이 주문한 메뉴가 완성되었습니다. (${menuToLog(menu)})`,

  startMaking: (customer, menu, count, baristaName) => `${baristaName}가 메뉴 제작을 시작했습니다. (${customer} : ${menu} ${count}개)`,
  finishMaking: (customer, menu, count, baristaName) => `${baristaName}가 메뉴 제작을 마쳤습니다. (${customer} : ${menu} ${count}개)`,

  startRiding: (customer, menu, riderName) => `${riderName}가 고객 ${customer}의 주문을 배달 시작했습니다. (${menuToLog(menu)})`,
  finishRiding: (customer, menu, riderName) => `${riderName}가 고객 ${customer}의 주문을 배달 완료했습니다. (${menuToLog(menu)})`,
};

export const DASHBOARD_LOG_CLASS = {
  addOrder: 'order',
  finishOrder: 'order',
  startMaking: '',
  finishMaking: '',
  startRiding: 'riding',
  finishRiding: 'riding',
};

const menuToLog = (menu) =>
  Object.entries(menu)
    .reduce((acc, arr) => [...acc, arr.join(':')], [])
    .join(' / ');
