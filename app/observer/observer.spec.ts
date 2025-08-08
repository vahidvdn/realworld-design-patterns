import { Logger } from "./observer";
import { FileTransport, ConsoleTransport, ElasticTransport } from "./observers";

describe('Logger', () => {
  let logger: Logger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new Logger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should attach transports', () => {
    const consoleTransport = new ConsoleTransport();
    const fileTransport = new FileTransport();
    const elasticTransport = new ElasticTransport();
    
    logger.attach(consoleTransport);
    logger.attach(fileTransport);
    logger.attach(elasticTransport);
    
    expect(logger.transports.length).toBe(3);
  });

  it('should detach transports', () => {
    const consoleTransport = new ConsoleTransport();
    const fileTransport = new FileTransport();
    
    logger.attach(consoleTransport);
    logger.attach(fileTransport);
    logger.detach(consoleTransport);
    
    expect(logger.transports.length).toBe(1);
    expect(logger.transports[0]).toBe(fileTransport);
  });

  it('should notify all attached transports', () => {
    const consoleTransport = new ConsoleTransport();
    const fileTransport = new FileTransport();
    
    const consoleSpy = jest.spyOn(consoleTransport, 'notify').mockReturnValue(true);
    const fileSpy = jest.spyOn(fileTransport, 'notify').mockReturnValue(true);
    
    logger.attach(consoleTransport);
    logger.attach(fileTransport);
    
    const logData = { level: 'info', message: 'Test message' };
    logger.notify(logData);
    
    expect(consoleSpy).toHaveBeenCalledWith(logData);
    expect(fileSpy).toHaveBeenCalledWith(logData);
  });

  it('should provide convenience methods for different log levels', () => {
    const transport = new ConsoleTransport();
    const transportSpy = jest.spyOn(transport, 'notify').mockReturnValue(true);
    logger.attach(transport);
    
    logger.info('Info message', { userId: 123 });
    logger.warn('Warning message');
    logger.error('Error message', { error: 'test' });
    logger.debug('Debug message');
    
    expect(transportSpy).toHaveBeenCalledTimes(4);
    expect(transportSpy).toHaveBeenNthCalledWith(1, { level: 'info', message: 'Info message', meta: { userId: 123 } });
    expect(transportSpy).toHaveBeenNthCalledWith(2, { level: 'warn', message: 'Warning message', meta: undefined });
    expect(transportSpy).toHaveBeenNthCalledWith(3, { level: 'error', message: 'Error message', meta: { error: 'test' } });
    expect(transportSpy).toHaveBeenNthCalledWith(4, { level: 'debug', message: 'Debug message', meta: undefined });
  });

  it('should not attach duplicate transports', () => {
    const consoleTransport = new ConsoleTransport();
    
    logger.attach(consoleTransport);
    logger.attach(consoleTransport); // Try to attach the same transport again
    
    expect(logger.transports.length).toBe(1);
  });
})
