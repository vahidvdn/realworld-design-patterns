import { Event } from "./event";
import { IEvent } from "./interface";

export class DB {
  constructor() {}

  save(payload: any) {
    console.log('I am saving in DB', payload);
    return true;
  }
}

export class StorableEvent implements IEvent {
  constructor(
    private readonly event: IEvent,
    private readonly db: DB,
  ) {}

  publish(payload: any) {
    console.log('Storable event:', payload);
    this.db.save(payload);
    return this.event.publish(payload);
  }
}

export class LoggableEvent implements IEvent {
  constructor(
    private readonly event: IEvent,
    private readonly logger: Console,
  ) {}

  publish(payload: any) {
    console.log('Loggable event:', payload);
    this.logger.log('I am logging now!')
    return this.event.publish(payload);
  }
}

const event = new Event();
const db = new DB();
const logger = console;

const storableEvent = new StorableEvent(event, db);
const loggableEvent = new LoggableEvent(event, logger);
const storableAndLoggableEvent = new StorableEvent(loggableEvent, db);

const result1 = storableEvent.publish({ name: 'Vahid Najafi' });
console.log('...............................................')

const result2 = loggableEvent.publish({ name: 'Vahid Najafi' });
console.log('...............................................')

const result3 = storableAndLoggableEvent.publish({ name: 'Vahid Najafi' });
console.log('...............................................')

console.log(result1, result2, result3);
