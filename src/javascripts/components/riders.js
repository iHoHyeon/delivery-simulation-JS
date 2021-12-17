export default class Rider {
  constructor(eventEmitter, name) {
    this.eventEmitter = eventEmitter;
    this.name = name;

    this.nowRiding = false;
  }

  async startRiding(order) {
    this.eventEmitter.emit('startRiding', order, this.name);
    this.nowRiding = true;
    await new Promise((res) => setTimeout(() => res(), 2000 * 5));
    return this.finishRiding(order);
  }

  finishRiding(order) {
    this.eventEmitter.emit('finishRiding', order, this.name);
    this.nowRiding = false;
  }
}
