export class BrowserStorage {
  get<T>(name: string, fallback: T): T {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(name);
        return item !== null ? JSON.parse(item) : fallback;
      } catch {
        return fallback;
      }
    }
    return fallback;
  }
}
