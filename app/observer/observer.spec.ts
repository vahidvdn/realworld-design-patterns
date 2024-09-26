import { Publisher } from "./observer";
import { DbObserver, CacheObserver, CustomersObserver } from "./observers";

describe('Observer', () => {
  const publisher = new Publisher();

  const dbObserver = new DbObserver();
  const cacheObserver = new CacheObserver();
  const customersObserver = new CustomersObserver();

  it('should be defined', () => {
    expect(publisher).toBeDefined();
  })

  it('should attach observers', () => {
    publisher.attach(dbObserver);
    publisher.attach(cacheObserver);
    publisher.attach(customersObserver);
    expect(publisher.observers.length).toBe(3);
  })

  it('should detach observers', () => {
    const publisher = new Publisher();
    publisher.attach(cacheObserver);
    publisher.attach(customersObserver);
    publisher.detach(dbObserver);
    expect(publisher.observers.length).toBe(1);
  })

  it('should notify observers', () => {
    const publisher = new Publisher();
    publisher.attach(cacheObserver);
    publisher.attach(customersObserver);
    publisher.detach(dbObserver);
    jest.spyOn(CacheObserver.prototype, 'notify').mockReturnValue(true);
    jest.spyOn(DbObserver.prototype, 'notify').mockReturnValue(true);

    const product = {
      id: 1,
      title: 'New Product',
      body: 'This is a new product for 2025.',
    };
    publisher.notify(product);
    expect(CacheObserver.prototype.notify).toHaveBeenCalledTimes(1);
    expect(DbObserver.prototype.notify).toHaveBeenCalledTimes(0);
  })
})
