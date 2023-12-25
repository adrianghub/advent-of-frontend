type GalacticHistoryTracer<T> = {
  add: (value: T) => void;
  current: () => T | null;
  undo: () => void;
  redo: () => void;
};

export function createTracer<T>(): GalacticHistoryTracer<T> {
  const history: T[] = [];
  let index = -1;

  return {
    add: (value: T) => {
      history.push(value);
      index = history.length - 1;
    },
    current: () => {
      return index === -1 ? null : history[index];
    },
    undo: () => {
      return index === -1 ? null : (index -= 1);
    },
    redo: () => {
      if (index === history.length - 1) {
        throw new Error("No more galaxies to explore");
      }

      index += 1;
    },
  };
}
