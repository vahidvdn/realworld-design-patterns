import { DB } from "./bad-practice"
import { Event } from "./event"

describe('Decorator bad practice', () => {
  const mockPayload = { name: 'Vahid Najafi' }

  it('should publish an event without saving in db', () => {
    const event = new Event()
    const result = event.publish(mockPayload)
    expect(result).toBe(true);
  })

  it('should save payload in the db', () => {
    const db = new DB()
    const result = db.save(mockPayload)
    expect(result).toBe(true);
  })

  it('should save and publish payload in the db at the same time', () => {
    const event = new Event()
    const db = new DB()
    const dbResult = db.save(mockPayload)
    const eventResult = event.publish(mockPayload)
    expect(dbResult).toBe(true);
    expect(eventResult).toBe(true);
  })
})
