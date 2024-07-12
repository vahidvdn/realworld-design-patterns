import { IUser } from "./interface";

class User {
  constructor() {}

  levelUp(user: IUser) {
    // check user points
    if (user.point < 50) {
      console.error('cannot level up user. no enough point.');
      return false;
    }

    // check if user has an open issue
    if (user.hasOpenIssue) {
      console.log("cannot level up user. user has open issue.");
      return false;
    }

    // check if user has some active days
    if (user.activeDays < 100) {
      console.error('cannot level up user. user has few active days.');
      return false;
    }

    return true;
  }
}

const user = new User()
const isLevelUp = user.levelUp({ point:60, hasOpenIssue: true, activeDays: 120 });
console.log('User levelup status:', isLevelUp);
