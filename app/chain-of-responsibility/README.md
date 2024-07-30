![chain-of-responsibility-cover](../../assets/chain-of-res.jpg)

## 💡 Use Case

Let's say you want to level up based on some conditions. Here I took some basic logic just for demonstration. But in realworld you may have some complex

## ❌ Bad Practice

```ts
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
```

This is considered bad practice because each `if` block may have more lines of code and logic.

## ✅ Good Practice

```ts
const userDto = { point:60, hasOpenIssue: true, activeDays: 120 }

const userPoint = new UserPoint()
userPoint
  .setNext(new UserHasOpenIssue())
  .setNext(new UserHasActiveDays());

const levelUp = userPoint.handle(userDto);
console.log('User levelup status:', levelUp);
```

By this way, you could easly extend your code in the future by adding new classes. See my Medium article here: https://medium.com/@vahid.vdn/learn-the-chain-of-responsibility-pattern-in-depth-with-typescript-4336f8fb4afb
