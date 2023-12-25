type ChildGifts = {
  childId: number;
  gifts: string[];
};

export class GiftRegistry {
  childrenGifts: ChildGifts[] = [];

  getGiftsForChild(childId: number): ChildGifts["gifts"] | undefined {
    return this.childrenGifts.find((child) => child.childId === childId)?.gifts;
  }

  addGift(childId: number, giftName: string): void {
    const foundChild = this.childrenGifts.find(
      (child) => child.childId === childId
    );

    if (!foundChild) {
      this.childrenGifts.push({
        childId,
        gifts: [giftName],
      });
    } else {
      foundChild.gifts.push(giftName);
    }
  }

  removeGift(childId: number, giftName: string): void {
    const foundChildGifts = this.childrenGifts.find(
      (child) => child.childId === childId
    )?.gifts;

    if (!foundChildGifts?.includes(giftName)) {
      throw new Error("Gift not found");
    }

    foundChildGifts.splice(foundChildGifts.indexOf(giftName), 1);
  }
}
