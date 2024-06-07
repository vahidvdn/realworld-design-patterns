export interface IUser {
  point: number;
  hasOpenIssue: boolean
  activeDays: number
}

export interface ConditionHandler {
  setNext(handler: ConditionHandler): ConditionHandler;
  handle(userData: IUser): boolean;
}