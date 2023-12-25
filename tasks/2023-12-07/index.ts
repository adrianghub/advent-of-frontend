type Letter = { [key: string]: number };

export function createTrackedLetter(
  letter: Letter,
  func: (letterKey: string, count: number) => void
): Letter {
  return new Proxy(letter, {
    set: (target, key: string, value: number) => {
      if (target[key] !== value) {
        func(key, value);
      }

      target[key] = value;

      return true;
    },
  });
}
