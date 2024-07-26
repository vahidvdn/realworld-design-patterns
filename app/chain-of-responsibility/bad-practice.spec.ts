import { User } from "./bad-practice";
import { IUser } from "./interface";

describe('Chain of Responsibility bad practice', () => {
  const userDto: IUser = { point: 60, hasOpenIssue: true, activeDays: 120 }
  const user = new User();

  test('User levelup status shoull be false because of open issue:', () => {
    const result = user.levelUp(userDto);
    expect(result).toBe(false);
  })

  test('User levelup status shoull be false because of open issue:', () => {
    const userDto: IUser = { point: 30, hasOpenIssue: false, activeDays: 120 }
    const result = user.levelUp(userDto);
    expect(result).toBe(false);
  })

  test('User levelup status shoull be false because of active days:', () => {
    const userDto: IUser = { point: 60, hasOpenIssue: false, activeDays: 80 }
    const result = user.levelUp(userDto);
    expect(result).toBe(false);
  })

  test('User levelup status shoull be true:', () => {
    const userDto: IUser = { point: 60, hasOpenIssue: false, activeDays: 120 }
    const result = user.levelUp(userDto);
    expect(result).toBe(true);
  })
})
