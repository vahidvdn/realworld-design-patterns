import { ConditionHandler } from './interface';

export class AbstractConditionHandler implements ConditionHandler {
  public nextHandler: ConditionHandler | null = null;

  public setNext(handler: ConditionHandler): ConditionHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(data: any): boolean {
    if (this.nextHandler) {
      return this.nextHandler.handle(data);
    }
    return true;
  }
}
