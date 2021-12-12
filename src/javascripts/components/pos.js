export default class POS {
  static instance;
  constructor(eventEmitter) {
    if (POS.instance) return POS.instance;
    POS.instance = this;

    this.eventEmitter = eventEmitter;
    this.orderQueue = [];
  }

  getHTML() {
    return `
    <div class="pos board">
      <div class="menu">
        <div class="label">메뉴</div>
        <div><div> 1. 아메리카노 (1분) </div> <div class="input">개수 <input name="americano" type="text" size=3 maxlength=2 placeholder="0"/></div></div>
        <div><div> 2. 바닐라라떼 (2분) </div> <div class="input">개수 <input name="vanilalatte" type="text" size=3 maxlength=2 placeholder="0"/></div></div>
        <div><div> 3. 허니브레드 (5분) </div> <div class="input">개수 <input name="honeybread" type="text" size=3 maxlength=2 placeholder="0"/></div></div>
        </div>
      <div class="customer"><div> 주문자 </div> <div class="input">이름 <input name="honeybread" type="text" size=8 maxlength=6 placeholder="입력"/></div></div>
      <button class="order" type="submit" disabled>주문</button>
    </div>
    `;
  }

  setDOMEvent() {
    const orderButton = document.querySelector('button.order');
    const orderCountList = document.querySelectorAll('.menu input');
    const customerNameInput = document.querySelector('.customer input');

    const checkIsNum = (event) => {
      event.currentTarget.value = event.currentTarget.value.replaceAll(/[^0-9.]/g, '');
    };

    const checkIsDisabled = () => {
      const check = [...orderCountList].some((input) => input.value) && customerNameInput.value;
      orderButton.disabled = !check;
    };

    const clearOrder = () => {
      [...orderCountList, customerNameInput].forEach((input) => (input.value = 0));
    };

    const submitOrder = () => {
      const [americano, vanillaLatte, honeyBead] = Array.from(orderCountList).map((input) => input.value);
      const customerName = customerNameInput.value;
      const order = {};

      if (americano) order[customerName] = { ...order[customerName], 아메리카노: americano };
      if (vanillaLatte) order[customerName] = { ...order[customerName], 바닐라라떼: vanillaLatte };
      if (honeyBead) order[customerName] = { ...order[customerName], 허니브레드: honeyBead };

      this.addOrder(order);
      clearOrder();
    };

    orderCountList.forEach((input) => {
      input.addEventListener('input', checkIsNum);
      input.addEventListener('input', checkIsDisabled);
    });

    customerNameInput.addEventListener('input', checkIsDisabled);

    orderButton.addEventListener('click', submitOrder);
  }

  addOrder(order) {
    this.orderQueue.push(order);
    this.eventEmitter.emit('addOrder');
  }
}
