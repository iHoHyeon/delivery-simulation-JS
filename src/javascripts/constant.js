export const MENU_TIME = { 아메리카노: 1000, 바닐라라떼: 2000, 허니브레드: 5000 };

export const DASHBOARD_OUTPUT = {
  addOrder: (customer, menu) => `${customer}님의 주문이 접수되었습니다. (${menuToLog(menu)})`,
  finishOrder: (customer, menu) => `${customer}님이 주문한 메뉴가 완성되었습니다. (${menuToLog(menu)})`,

  startMaking: (customer, menu, count, baristaName) => `${baristaName}가 메뉴 제작을 시작했습니다. (${customer} : ${menu} ${count}개)`,
  finishMaking: (customer, menu, count, baristaName) => `${baristaName}가 메뉴 제작을 마쳤습니다. (${customer} : ${menu} ${count}개)`,
};

const menuToLog = (menu) =>
  Object.entries(menu)
    .reduce((acc, arr) => [...acc, arr.join(':')], [])
    .join(' / ');
