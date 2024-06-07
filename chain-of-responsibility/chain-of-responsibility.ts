import { UserHasActiveDays, UserHasOpenIssue, UserPoint } from "./condition-handlers";

const userDto = { point:60, hasOpenIssue: true, activeDays: 120 }

const userPoint = new UserPoint()
userPoint
  .setNext(new UserHasOpenIssue())
  .setNext(new UserHasActiveDays());

const levelUp = userPoint.handle(userDto);
console.log('User levelup status:', levelUp);