export interface Tool {
  init(): void;

  update(): void;

  dispose(): void;
}

export class Equipment {
  private tools: Tool[] = [];
  private initialized: {
    [key: string]: boolean;
  } = {};

  registerTools(tool: Tool): void {
    this.tools.push(tool);
  }

  initializeTools(): void {
    this.tools.forEach((tool) => {
      tool.init();
      this.initialized[tool.constructor.name] = true;
    });
  }

  updateTools(): void {
    if (Object.keys(this.initialized).length === 0) {
      throw new Error("Cannot update any tools before initialization.");
    }
    this.tools.forEach((tool) => tool.update());
  }

  disposeTools(): void {
    this.tools.forEach((tool) => tool.dispose());
  }
}
