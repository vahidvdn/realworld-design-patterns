import { DbObserver } from "./db-observer";

describe('Observer', () => {
  it('should notify db', () => {
    const dbObserver = new DbObserver();
    const payload = { id: 1, name: 'John' };
    expect(dbObserver.notify(payload)).toBe(true);
  })
})
