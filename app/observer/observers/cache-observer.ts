import { Observer } from "../interface";

export class CacheObserver implements Observer {
  constructor() {}

  notify(payload: any) {
    console.log('I am notifying cache', payload);
    return true;
  }
}
