export class InjectionToken<T> {
  constructor(public name: T) {}
}

export class FactoryInjector {
  blueprintMap = new Map();

  registerClass<T>(blueprint: T) {
    // @ts-ignore
    this.blueprintMap.set(blueprint, new blueprint());
  }

  get<T>(blueprint: any): T {
    if (!this.blueprintMap.has(blueprint)) {
      throw new Error("No such blueprint");
    }
    return this.blueprintMap.get(blueprint);
  }

  provideValue<T>(token: InjectionToken<T>, value: T) {
    this.blueprintMap.set(token, value);
  }
}
