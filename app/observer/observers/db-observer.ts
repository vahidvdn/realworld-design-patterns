import { Observer } from "../interface";

export class DbObserver implements Observer {
  constructor() {}

  notify(payload: any) {
    console.log('I am notifying DB', payload);
    return true;
  }
}
