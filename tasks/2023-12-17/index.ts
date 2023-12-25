export const GSL_DEMO_SNIPPET = `
Gift(ribbon: "gold curly", label: "Merry Christmas!") {
    Wearable(type: "socks", size: "small", color: "red").if(winterSeason: true) {
      pattern: "snowflakes"
    }

    Wearable(type: "scarf", size: "medium", color: "green") {
      pattern: "snowflakes"
    }

    Literary(type: "book", size: "15cm 22cm 2cm", title: "Christmas Stories", author: "C. Claus")
}
`;

export type Gift = {
  items: Item[];
};

export type Item = {
  type: string;
};

export type Wearable = Item & {
  color: string;
  size: string;
};

export type Literary = Item & {
  title: string;
  size: string;
  author: string;
};

export function parseGSL(gslScript: string): Gift {
  gslScript = gslScript.trim();

  const gift: Gift = {
    items: [],
  };

  const items = gslScript
    .substring(gslScript.indexOf("{") + 1, gslScript.lastIndexOf("}"))
    .trim();

  const itemsArray = items.split("\n");

  for (const item of itemsArray) {
    if (item.trim().startsWith("Wearable")) {
      gift.items.push({ ...parseWearable(item) } as Wearable);
    } else if (item.trim().startsWith("Literary")) {
      gift.items.push({ ...parseLiterary(item) } as Literary);
    }
  }

  return gift;
}

function parseWearable(item: string): Wearable {
  const type = item.match(/type: "(\w+)"/)?.[1]!;
  const color = item.match(/color: "(\w+)"/)?.[1]!;
  const size = item.match(/size: "(\w+)"/)?.[1]!;

  return { type, color, size } as Wearable;
}

function parseLiterary(item: string): Literary {
  const type = item.match(/type: "(\w+)"/)?.[1]!;
  const title = item.match(/title: "(\w+)"/)?.[1]!;
  const author = item.match(/author: "(\w+)"/)?.[1]!;
  const size = item.match(/size: "(\w+)"/)?.[1]!;

  return { type, title, author, size } as Literary;
}
