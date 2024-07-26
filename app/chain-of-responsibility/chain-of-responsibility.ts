import { UserHasActiveDays, UserHasOpenIssue, UserPoint } from "./condition-handlers";
import { IUser } from "./interface";

export class UserLevel {
  constructor(
    private userPoint: UserPoint,
    private userHasOpenIssue: UserHasOpenIssue,
    private userHasActiveDays: UserHasActiveDays
  ) {}

  checkLevelUp(userDto: IUser) {
    this.userPoint
      .setNext(this.userHasOpenIssue)
      .setNext(this.userHasActiveDays);

    const levelUp = this.userPoint.handle(userDto);
    return levelUp;
  }
}


const userLevel = new UserLevel(
  new UserPoint(),
  new UserHasOpenIssue(),
  new UserHasActiveDays(),
)

const userDto: IUser = { point:60, hasOpenIssue: true, activeDays: 120 }
const levelUp = userLevel.checkLevelUp(userDto);

console.log('User levelup status:', levelUp);
