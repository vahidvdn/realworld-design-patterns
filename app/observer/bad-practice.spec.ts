import { Customers, Db, Cache } from "./bad-practice";

describe('Bad practice', () => {
  const cache = new Cache();
  const db = new Db();
  const customers = new Customers();
  const payload = { id: 1, name: 'John' };

  it('should update db', () => {
    expect(db.update(payload)).toBe(true);
  })

  it('should save cache', () => {
    expect(cache.save(payload)).toBe(true);
  })

  it('should send push to customers', () => {
    expect(customers.sendPush(payload)).toBe(true);
  })
})
