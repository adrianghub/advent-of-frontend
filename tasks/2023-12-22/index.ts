export interface TextProcessingPlugin {
  process(text: string): string;
}

export class TextProcessor {
  private plugins: TextProcessingPlugin[] = [];

  use(plugin: TextProcessingPlugin): void {
    this.plugins.push(plugin);
  }

  process(text: string): string {
    return this.plugins.reduce((processedText, plugin) => {
      return plugin.process(processedText);
    }, text);
  }
}

export class RemoveWordsPlugin implements TextProcessingPlugin {
  constructor(public words: string[]) {}
  process(text: string): string {
    return text
      .split(/\b/)
      .filter((word) => !this.words.includes(word))
      .join("")
      .replace(/\s{2,}/g, " ");
  }
}

export class ReplaceCharsPlugin implements TextProcessingPlugin {
  constructor(public charsMap: Record<string, string>) {}
  process(text: string): string {
    return text
      .split("")
      .map((char) =>
        this.charsMap[char] !== undefined ? this.charsMap[char] : char
      )
      .join("");
  }
}

export class MarkdownToHtmlPlugin implements TextProcessingPlugin {
  process(text: string): string {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  }
}
