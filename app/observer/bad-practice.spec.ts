// Tests for the naive logging approach in bad-practice.ts

describe('Bad Practice Logging', () => {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalDebug = console.debug;

  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let debugSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    warnSpy.mockRestore();
    errorSpy.mockRestore();
    debugSpy.mockRestore();
  });

  it('should log to all destinations (console, file, elastic)', () => {
    // Import the bad-practice file to execute its code
    require('./bad-practice');

    // Console logs
    expect(logSpy).toHaveBeenCalledWith('[INFO] Application started successfully');
    expect(warnSpy).toHaveBeenCalledWith('[WARN] This is a warning message', { userId: 123, action: 'login' });
    expect(errorSpy).toHaveBeenCalledWith('[ERROR] Database connection failed', { error: 'ECONNREFUSED', host: 'localhost:5432' });
    expect(debugSpy).toHaveBeenCalledWith('[DEBUG] Processing user request', { requestId: 'req-456', endpoint: '/api/users' });

    // File logs (simulate)
    expect(logSpy).toHaveBeenCalledWith('Writing to file [application.log]:', '[INFO] Application started successfully');
    expect(logSpy).toHaveBeenCalledWith('Writing to file [application.log]:', '[WARN] This is a warning message');
    expect(logSpy).toHaveBeenCalledWith('Writing to file [application.log]:', '[ERROR] Database connection failed');
    expect(logSpy).toHaveBeenCalledWith('Writing to file [application.log]:', '[DEBUG] Processing user request');

    // Elastic logs (simulate)
    expect(logSpy).toHaveBeenCalledWith('Sending to Elastic [http://localhost:9200/app-logs]:', '[INFO] Application started successfully');
    expect(logSpy).toHaveBeenCalledWith('Sending to Elastic [http://localhost:9200/app-logs]:', '[WARN] This is a warning message');
    expect(logSpy).toHaveBeenCalledWith('Sending to Elastic [http://localhost:9200/app-logs]:', '[ERROR] Database connection failed');
    expect(logSpy).toHaveBeenCalledWith('Sending to Elastic [http://localhost:9200/app-logs]:', '[DEBUG] Processing user request');
  });
});
