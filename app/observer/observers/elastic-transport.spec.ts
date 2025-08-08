import { ElasticTransport } from "./elastic-transport";

describe('ElasticTransport', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should simulate sending to Elasticsearch with default config', () => {
    const elasticTransport = new ElasticTransport();
    const logData = { level: 'info', message: 'User action', meta: { userId: 456, action: 'purchase' } };
    
    const result = elasticTransport.notify(logData);
    
    expect(result).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sending to Elasticsearch http://localhost:9200/app-logs:',
      expect.stringContaining('"level": "info"')
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.any(String),
      expect.stringContaining('"message": "User action"')
    );
  });

  it('should simulate sending to custom Elasticsearch config', () => {
    const elasticTransport = new ElasticTransport('https://elastic.example.com:9200', 'custom-logs');
    const logData = { level: 'error', message: 'System failure' };
    
    const result = elasticTransport.notify(logData);
    
    expect(result).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sending to Elasticsearch https://elastic.example.com:9200/custom-logs:',
      expect.any(String)
    );
  });

  it('should include proper document structure with timestamp and service', () => {
    const elasticTransport = new ElasticTransport();
    const logData = { level: 'debug', message: 'Debug message', meta: { requestId: 'req-123' } };
    
    const result = elasticTransport.notify(logData);
    
    expect(result).toBe(true);
    const loggedDocument = JSON.parse(consoleSpy.mock.calls[0][1]);
    
    expect(loggedDocument).toHaveProperty('@timestamp');
    expect(loggedDocument).toHaveProperty('level', 'debug');
    expect(loggedDocument).toHaveProperty('message', 'Debug message');
    expect(loggedDocument).toHaveProperty('service', 'observer-pattern-demo');
    expect(loggedDocument.meta).toEqual({ requestId: 'req-123' });
  });
})
