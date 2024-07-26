import { UserHasActiveDays, UserHasOpenIssue, UserPoint } from "./condition-handlers";
import { IUser } from "./interface";

describe('Condition Handlers', () => {
  const userDto: IUser = { point: 40, hasOpenIssue: true, activeDays: 90 }
  describe('UserPoint', () => {
    const userPoint = new UserPoint();

    test('it should return false if user point is less than 50', () => {
      const result = userPoint.handle(userDto);
      expect(result).toBe(false);
    })

    test('it should return true if user point is less than 50', () => {
      const userDto: IUser = { point: 60, hasOpenIssue: true, activeDays: 120 }
      const result = userPoint.handle(userDto);
      expect(result).toBe(true);
    })
  })

  describe('UserHasOpenIssue', () => {
    const userHasOpenIssue = new UserHasOpenIssue();

    test('it should return false if user has an open issue', () => {
      const result = userHasOpenIssue.handle(userDto);
      expect(result).toBe(false);
    })

    test('it should return true if user has an open issue', () => {
      const userDto: IUser = { point: 60, hasOpenIssue: false, activeDays: 120 }
      const result = userHasOpenIssue.handle(userDto);
      expect(result).toBe(true);
    })
  })

  describe('UserHasActiveDays', () => {
    const userHasActiveDays = new UserHasActiveDays();

    test('it should return false if user has few active days', () => {
      const result = userHasActiveDays.handle(userDto);
      expect(result).toBe(false);
    })

    test('it should return true if user has few active days', () => {
      const userDto: IUser = { point: 60, hasOpenIssue: false, activeDays: 100 }
      const result = userHasActiveDays.handle(userDto);
      expect(result).toBe(true);
    })
  })

})
