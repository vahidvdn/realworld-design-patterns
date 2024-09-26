import { Observer } from "../interface";

export class CustomersObserver implements Observer {
  constructor() {}

  notify(payload: any) {
    console.log('I am notifying customers', payload);
    return true;
  }
}
