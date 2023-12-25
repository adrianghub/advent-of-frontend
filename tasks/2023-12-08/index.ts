export interface Letter {
  content: string;
  country: "pl" | "de" | "us";
  priority: "high" | "medium" | "low";
}

export class LetterSorter {
  strategy!: PriorityStrategy | CountryStrategy | LengthStrategy;

  constructor(strategy: PriorityStrategy | CountryStrategy | LengthStrategy) {
    this.strategy = strategy;
  }

  sortLetters(letters: Letter[]): Letter[] {
    return this.strategy.sort(letters);
  }
}

export class PriorityStrategy {
  priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  sort(letters: Letter[]): Letter[] {
    return letters.sort((a, b) => {
      if (this.priorityOrder[a.priority] > this.priorityOrder[b.priority]) {
        return 1;
      }
      if (this.priorityOrder[a.priority] < this.priorityOrder[b.priority]) {
        return -1;
      }
      return 0;
    });
  }
}

export class CountryStrategy {
  countryOrder = {
    pl: 1,
    de: 2,
    us: 3,
  };

  sort(letters: Letter[]): Letter[] {
    return letters.sort((a, b) => {
      if (this.countryOrder[a.country] > this.countryOrder[b.country]) {
        return 1;
      }
      if (this.countryOrder[a.country] < this.countryOrder[b.country]) {
        return -1;
      }
      return 0;
    });
  }
}

export class LengthStrategy {
  sort(letters: Letter[]): Letter[] {
    return letters.sort((a, b) => a.content.length - b.content.length);
  }
}
