import { ConsoleTransport } from "./console-transport";

describe('ConsoleTransport', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log to console with timestamp and format', () => {
    const consoleTransport = new ConsoleTransport();
    const logData = { level: 'info', message: 'Test message', meta: { userId: 123 } };
    
    const result = consoleTransport.notify(logData);
    
    expect(result).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] \[CONSOLE\] info: Test message/),
      { userId: 123 }
    );
  });

  it('should handle log data without meta', () => {
    const consoleTransport = new ConsoleTransport();
    const logData = { level: 'error', message: 'Error occurred' };
    
    const result = consoleTransport.notify(logData);
    
    expect(result).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] \[CONSOLE\] error: Error occurred/),
      ''
    );
  });
})
