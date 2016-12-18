export default class Callback {
  constructor() {
    this.listeners = [];
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  trigger() {
    this.listeners.forEach(fn => {
      fn.apply(null, arguments);
    });
  }
}
