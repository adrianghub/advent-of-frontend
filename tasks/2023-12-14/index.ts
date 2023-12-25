export type Gift = {
  value: number;
  weight: number;
  volume: number;
};

export function calculateMaxGiftValue(
  gifts: Gift[],
  maxWeight: number,
  maxVolume: number
): number {
  if (gifts.length === 0) {
    return 0;
  }

  let remainingWeight = maxWeight;
  let remainingVolume = maxVolume;

  const maxGiftValue = gifts
    .sort((a, b) => b.value - a.value)
    .reduce((maxValue, gift) => {
      if (gift.weight <= remainingWeight && gift.volume <= remainingVolume) {
        remainingWeight = maxWeight - gift.weight;
        remainingVolume = maxVolume - gift.volume;

        return maxValue + gift.value;
      }

      return maxValue;
    }, 0);

  return maxGiftValue;
}
