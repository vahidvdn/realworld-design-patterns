import { CacheObserver } from "./cache-observer";

describe('Observer', () => {
  it('should notify cache', () => {
    const cacheObserver = new CacheObserver();
    const payload = { id: 1, name: 'John' };
    expect(cacheObserver.notify(payload)).toBe(true);
  })
})
