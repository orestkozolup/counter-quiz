export class BrowserStorage {
  get<T>(name: string, fallback: T): T | string {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(name);
        return item !== null ? item : fallback;
      } catch {
        return fallback;
      }
    }
    return fallback;
  }

  set(name: string, value: any): void {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch (e) {
      console.warn("Error setting to browser storage: ", e);
    }
  }
}
