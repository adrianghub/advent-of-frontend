export class ChristmasEmitter {
  subscribers: { [key: string]: Array<(event: string) => void> } = {};

  on(event: string, cb: (event: string) => void): void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(cb);
  }

  off(event: string, cb: (event: string) => void): void {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event] = this.subscribers[event].filter(
      (callback) => callback !== cb
    );
  }

  emit(event: string) {
    if (!this.subscribers[event]) {
      return;
    }

    this.subscribers[event].forEach((callback) => callback(event));
  }
}
