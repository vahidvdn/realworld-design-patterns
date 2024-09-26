import { CustomersObserver } from "./customers.observer";

describe('Observer', () => {
  it('should notify customers', () => {
    const customersObserver = new CustomersObserver();
    const payload = { id: 1, name: 'John' };
    expect(customersObserver.notify(payload)).toBe(true);
  })
})
