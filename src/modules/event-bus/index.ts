export default class EventBus {
  private listeners: {
    [key: string]: ((...args: unknown[]) => void)[],
  };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (...args: unknown[]) => void | undefined): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    if (callback) {
      this.listeners[event].push(callback);
    }
  }

  off(event: string, callback: (...args: unknown[]) => void): void {
    if (!this.listeners[event]) {
      throw new Error(`No event: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: string, ...args: unknown[]): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => {
        listener(...args);
      });
    }
  }
}
