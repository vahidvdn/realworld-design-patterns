import { Observer } from "../interface";

export class FileTransport implements Observer {
  private logFile: string;

  constructor(logFile: string = 'app.log') {
    this.logFile = logFile;
  }

  notify(logData: any) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [FILE] ${logData.level}: ${logData.message} ${JSON.stringify(logData.meta || {})}`;
    
    // In a real implementation, this would write to a file
    // For demo purposes, we'll simulate file writing
    console.log(`Writing to ${this.logFile}: ${logEntry}`);
    return true;
  }
}
