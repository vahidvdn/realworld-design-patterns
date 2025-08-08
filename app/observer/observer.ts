import { Observer, Subject } from "./interface";
import { ConsoleTransport, FileTransport, ElasticTransport } from "./observers";

export class Logger implements Subject {
  public transports: Observer[] = [];

  attach(transport: Observer): void {
    const isExist = this.transports.includes(transport);
    if (!isExist) {
      this.transports.push(transport);
    }
  }

  detach(transport: Observer): void {
    const transportIndex = this.transports.indexOf(transport);
    this.transports.splice(transportIndex, 1);
  }

  notify(logData): void {
    for (const transport of this.transports) {
      transport.notify(logData);
    }
  }

  // Convenience methods for different log levels
  info(message: string, meta?: any): void {
    this.notify({ level: 'info', message, meta });
  }

  warn(message: string, meta?: any): void {
    this.notify({ level: 'warn', message, meta });
  }

  error(message: string, meta?: any): void {
    this.notify({ level: 'error', message, meta });
  }

  debug(message: string, meta?: any): void {
    this.notify({ level: 'debug', message, meta });
  }
}

// Create logger instance
const logger = new Logger();

// Create transport instances
const consoleTransport = new ConsoleTransport();
const fileTransport = new FileTransport('application.log');
const elasticTransport = new ElasticTransport('http://localhost:9200', 'app-logs');

// Attach transports to logger
logger.attach(consoleTransport);
logger.attach(fileTransport);
logger.attach(elasticTransport);

// Example usage - log different types of messages
logger.info('Application started successfully');
logger.warn('This is a warning message', { userId: 123, action: 'login' });
logger.error('Database connection failed', { error: 'ECONNREFUSED', host: 'localhost:5432' });
logger.debug('Processing user request', { requestId: 'req-456', endpoint: '/api/users' });
