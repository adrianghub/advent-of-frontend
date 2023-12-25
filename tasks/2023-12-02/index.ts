export class ChristmasQueue<T> {
  queue: { item: T; order: number }[] = [];

  enqueue(item: T, order: number) {
    this.queue.push({
      item,
      order,
    });

    this.queue.sort((a, b) => b.order - a.order);
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error("There are no letters in the queue!");
    }

    return this.queue.shift()!.item;
  }

  isEmpty() {
    return !this.queue.length;
  }
}
