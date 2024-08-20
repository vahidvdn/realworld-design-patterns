import { IEvent } from "./interface";

export class Event implements IEvent {
  constructor() {}

  publish(payload: any) {
    console.log('EVENT ---> payload published', payload);
    return true;
  }
}
