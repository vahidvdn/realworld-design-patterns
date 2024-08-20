import { Event } from "./event"

describe('Decorator bad practice', () => {
  const mockPayload = { name: 'Vahid Najafi' }

  it('should publish an event', () => {
    const event = new Event()
    const result = event.publish(mockPayload)
    expect(result).toBe(true);
  })
})
