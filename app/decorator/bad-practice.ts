import { Event } from "./event";

export class DB {
  constructor() {}
  save(payload: any) {
    console.log('payload saved in DB', payload);
    return true;
  }
}

const event = new Event();

const payload = { name: 'John Doe' };

event.publish(payload);

// NOTE: can be forgotten!
const db = new DB();
db.save(payload);
