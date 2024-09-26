import { Observer, Subject } from "./interface";
import { CacheObserver, CustomersObserver, DbObserver } from "./observers";

export class Publisher implements Subject {
  public observers: Observer[] = [];

  attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (!isExist) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    this.observers.splice(observerIndex, 1);
  }

  notify(payload): void {
    for (const observer of this.observers) {
      observer.notify(payload);
    }
  }
}

const product = {
  id: 1,
  title: 'New Product',
  body: 'This is a new product for 2025.',
};

const publisher = new Publisher();

const dbObserver = new DbObserver();
const cacheObserver = new CacheObserver();
const customersObserver = new CustomersObserver();

publisher.attach(dbObserver);
publisher.attach(cacheObserver);
publisher.attach(customersObserver);

publisher.notify(product);
