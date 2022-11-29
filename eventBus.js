class EventBus {
  constructor() {
    this.handlers = {};
  }
  on(eventName, eventHandler, thisArg) {
    let handler = this.handlers[eventName];
    if (!handler) {
      handler = [];
      this.handlers[eventName] = handler;
    }
    handler.push({
      eventHandler,
      thisArg,
    });
  }
  emit(eventName, ...payload) {
    const handler = this.handlers[eventName];
    if (!handler) return;
    handler.forEach((handlerObj) => {
      if (typeof handlerObj === "object") {
        handlerObj.eventHandler.apply(handlerObj.thisArg, payload);
      }
    });
  }
  off(eventName, eventHandler) {
    const handler = this.handlers[eventName];
    if (!handler) return;
    for (let i = 0; i < handler.length; i++) {
      const handlerObj = handler[i];
      if (typeof handlerObj === "object") {
        if (eventHandler === handlerObj.eventHandler) {
          handler[i] = undefined;
        }
      }
    }
  }
}
