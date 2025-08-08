import { FileTransport } from "./file-transport";

describe('FileTransport', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should simulate writing to file with default filename', () => {
    const fileTransport = new FileTransport();
    const logData = { level: 'warn', message: 'Warning message', meta: { component: 'auth' } };
    
    const result = fileTransport.notify(logData);
    
    expect(result).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Writing to app\.log: \[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] \[FILE\] warn: Warning message/)
    );
  });

  it('should simulate writing to custom file', () => {
    const fileTransport = new FileTransport('custom.log');
    const logData = { level: 'debug', message: 'Debug info' };
    
    const result = fileTransport.notify(logData);
    
    expect(result).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Writing to custom\.log: \[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] \[FILE\] debug: Debug info/)
    );
  });

  it('should include meta data in JSON format', () => {
    const fileTransport = new FileTransport('test.log');
    const logData = { level: 'error', message: 'Error occurred', meta: { errorCode: 500, stack: 'trace' } };
    
    const result = fileTransport.notify(logData);
    
    expect(result).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('{"errorCode":500,"stack":"trace"}')
    );
  });
})
