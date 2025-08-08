![observer-pattern](../../assets/observer.jpg)

## 💡 Use Case

Suppose you are building a logging system for an application. You want to log messages to multiple destinations: the console, a file, and an external service like Elasticsearch. Instead of calling each logging mechanism separately, you can use the Observer pattern to decouple the logger from its outputs (transports).

## ❌ Bad Practice

A naive approach would be to call each transport directly every time you log a message:

```ts
const message = 'Application started';
console.log(message);
writeToFile('application.log', message);
sendToElastic('http://localhost:9200', message);
```

This approach is hard to extend and maintain—adding or removing a transport requires changing the logging code everywhere.

## ✅ Good Practice

With the Observer pattern, each transport implements the same `Observer` interface:

```ts
export interface Observer {
  notify(payload: any): boolean
}
```

The `Subject` interface manages a list of observers (transports):

```ts
export interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(payload): void;
}
```

The `Logger` class implements the `Subject` interface and can notify all attached transports:

```ts
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
```

You can then create and attach different transports:

```ts
const logger = new Logger();

const consoleTransport = new ConsoleTransport();
const fileTransport = new FileTransport('application.log');
const elasticTransport = new ElasticTransport('http://localhost:9200', 'app-logs');

logger.attach(consoleTransport);
logger.attach(fileTransport);
logger.attach(elasticTransport);

logger.info('Application started successfully');
logger.warn('This is a warning message', { userId: 123, action: 'login' });
logger.error('Database connection failed', { error: 'ECONNREFUSED', host: 'localhost:5432' });
logger.debug('Processing user request', { requestId: 'req-456', endpoint: '/api/users' });
```

This way, you can add or remove logging destinations without changing the logger's core logic, making your codebase more maintainable and extensible.

