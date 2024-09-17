export class GiftStream {
  gifts: string[];

  constructor(gifts: string[]) {
    this.gifts = gifts;
  }

  map(callback: (value: string) => string) {
    return new GiftStream(this.gifts.map(callback));
  }

  skip(count: number) {
    return new GiftStream(this.gifts.slice(count));
  }

  take(count: number) {
    return new GiftStream(this.gifts.slice(0, count));
  }

  getGifts() {
    return this.gifts;
  }
}
