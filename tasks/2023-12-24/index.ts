abstract class Component {
  protected state: any;
  protected style?: string;

  constructor(state?: any, style?: string) {
    this.state = state;
    this.style = style;
  }

  setState<T>(state: T): void {
    this.state = state;
  }

  abstract template(): string;
}

function renderComponent(component: Component): string {
  return component.template();
}

export { Component, renderComponent };
