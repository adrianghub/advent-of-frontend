export class RateLimiter {
  private maxRequests: number;
  private intervalMs: number;
  private requestTimes: number[];

  constructor(maxRequests: number, intervalMs: number) {
    this.maxRequests = maxRequests;
    this.intervalMs = intervalMs;
    this.requestTimes = [];
  }

  attemptAccess(): boolean {
    const now = Date.now();
    this.requestTimes = this.requestTimes.filter(
      (time) => time > now - this.intervalMs
    );
    if (this.requestTimes.length < this.maxRequests) {
      this.requestTimes.push(now);
      return true;
    }
    return false;
  }
}
