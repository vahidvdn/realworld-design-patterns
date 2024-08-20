import { LoggableEvent, StorableEvent } from "./decorator";

describe('Decorator', () => {
  const mockDB = {
    save: jest.fn(() => true),
  }

  const mockEvent = {
    publish: jest.fn((payload: any) => true),
  }

  const mockLogger = {
    log: jest.fn(),
  } as Partial<Console> as Console;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should publish and store the event at the same time', () => {
    const storableEvent = new StorableEvent(mockEvent, mockDB);
    const result = storableEvent.publish({ name: 'Vahid Najafi' })
    expect(result).toBe(true);
    expect(mockDB.save).toHaveBeenCalled();
    expect(mockEvent.publish).toHaveBeenCalled();
  })

  it('should publish and log the event at the same time', () => {
    const loggableEvent = new LoggableEvent(mockEvent, mockLogger);
    const result = loggableEvent.publish({ name: 'Vahid Najafi' })
    expect(result).toBe(true);
    expect(mockLogger.log).toHaveBeenCalled();
    expect(mockEvent.publish).toHaveBeenCalled();
  })

  it('should publish and save and log the event at the same time', () => {
    const storableEvent = new LoggableEvent(mockEvent, mockLogger);
    const storableAndLoggableEvent = new StorableEvent(storableEvent, mockDB);
    const result = storableAndLoggableEvent.publish({ name: 'Vahid Najafi' })
    expect(result).toBe(true);
    expect(mockLogger.log).toHaveBeenCalled();
    expect(mockDB.save).toHaveBeenCalled();
    expect(mockEvent.publish).toHaveBeenCalled();
  })
})
