export class OrderController {
  machines: Machine[] = [];

  registerMachine(machine: Machine): void {
    this.machines.push(machine);
  }

  unregisterMachine(machine: Machine): void {
    this.machines = this.machines.filter((m) => m !== machine);
  }

  setState(newState: string): void {
    if (newState === "unknown") {
      throw new Error("Invalid state provided");
    }

    this.machines.forEach((machine) => {
      machine.updateState(newState);
    });
  }
}

export class Machine {
  state: string | null = null;
  orders: string[] = [];

  count: number = 1;

  updateState(newState: string) {
    this.state = newState;
    this.orders.push(`Order #${this.count} - ${newState}`);
    this.count++;
  }

  performAudit() {
    return this.orders;
  }
}
