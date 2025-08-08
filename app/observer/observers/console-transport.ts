import { Observer } from "../interface";

export class ConsoleTransport implements Observer {
  constructor() {}

  notify(logData: any) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [CONSOLE] ${logData.level}: ${logData.message}`, logData.meta || '');
    return true;
  }
}
