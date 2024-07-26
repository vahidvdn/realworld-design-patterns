import { AbstractConditionHandler } from "./abstract-condition-handler"
import { UserLevel } from "./chain-of-responsibility"
import { ConditionHandler, IUser } from "./interface"

describe('Chain of Responsibility', () => {
  const mockUserPoint: AbstractConditionHandler = {
    handle: jest.fn((user: IUser) => true),
    setNext: jest.fn((handler: ConditionHandler) => handler),
    nextHandler: null,
  }
  const mockUserHasOpenIssue: AbstractConditionHandler = {
    handle: jest.fn((user: IUser) => true),
    setNext: jest.fn((handler: ConditionHandler) => handler),
    nextHandler: null,
  }
  const mockUserHasActiveDays: AbstractConditionHandler = {
    handle: jest.fn((user: IUser) => true),
    setNext: jest.fn((handler: ConditionHandler) => handler),
    nextHandler: null,
  }

  const userLevel = new UserLevel(
    mockUserPoint,
    mockUserHasOpenIssue,
    mockUserHasActiveDays
  )

  const userDto: IUser = { point:60, hasOpenIssue: true, activeDays: 120 }

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * nextHandler is null in the mocks
   * so handle's method of mockUserPoint is returning true
   * nextHandler is set in the other tests
   */
  it('User levelup status should be true:', () => {
    const result = userLevel.checkLevelUp(userDto)
    expect(mockUserPoint.handle).toHaveBeenCalledTimes(1)
    expect(mockUserHasActiveDays.handle).toHaveBeenCalledTimes(0)
    expect(mockUserHasOpenIssue.handle).toHaveBeenCalledTimes(0)
    expect(result).toBe(true)
  })

  it('User levelup status should be false because user has less points:', () => {
    jest.spyOn(mockUserPoint, 'handle').mockReturnValueOnce(false)
    const result = userLevel.checkLevelUp(userDto)
    expect(mockUserPoint.handle).toHaveBeenCalledTimes(1)
    expect(mockUserHasActiveDays.handle).toHaveBeenCalledTimes(0)
    expect(mockUserHasOpenIssue.handle).toHaveBeenCalledTimes(0)
    expect(result).toBe(false)
  })

  it('User levelup status should be false because user has open issues:', () => {
    jest.spyOn(mockUserHasOpenIssue, 'handle').mockReturnValueOnce(false)
    jest.spyOn(mockUserPoint, 'handle').mockImplementationOnce((user) => mockUserHasOpenIssue.handle(user))
    const result = userLevel.checkLevelUp(userDto)
    expect(mockUserPoint.handle).toHaveBeenCalledTimes(1)
    expect(mockUserHasOpenIssue.handle).toHaveBeenCalledTimes(1)
    expect(mockUserHasActiveDays.handle).toHaveBeenCalledTimes(0)
    expect(result).toBe(false)
  })

  it('User levelup status should be false because user has no active days:', () => {
    jest.spyOn(mockUserHasActiveDays, 'handle').mockReturnValueOnce(false)
    jest.spyOn(mockUserHasOpenIssue, 'handle').mockImplementationOnce((user) => mockUserHasActiveDays.handle(user))
    jest.spyOn(mockUserPoint, 'handle').mockImplementationOnce((user) => mockUserHasOpenIssue.handle(user))
    const result = userLevel.checkLevelUp(userDto)
    expect(mockUserPoint.handle).toHaveBeenCalledTimes(1)
    expect(mockUserHasOpenIssue.handle).toHaveBeenCalledTimes(1)
    expect(mockUserHasActiveDays.handle).toHaveBeenCalledTimes(1)
    expect(result).toBe(false)
  })

  it('User levelup status should be false because all conditions are not met:', () => {
    jest.spyOn(mockUserPoint, 'handle').mockReturnValueOnce(false)
    jest.spyOn(mockUserHasOpenIssue, 'handle').mockReturnValueOnce(false)
    jest.spyOn(mockUserHasActiveDays, 'handle').mockReturnValueOnce(false)
    const result = userLevel.checkLevelUp(userDto)
    expect(mockUserPoint.handle).toHaveBeenCalledTimes(1)
    expect(mockUserHasOpenIssue.handle).toHaveBeenCalledTimes(0)
    expect(mockUserHasActiveDays.handle).toHaveBeenCalledTimes(0)
    expect(result).toBe(false)
  })
})
