![factory-method](../../assets/factory-method.jpg)

## 💡 Use Case

Previously we learned about the Strategy Pattern. Now we want to decide which strategy to use at runtime. Instead of repeating this decision in every place, we can use the Factory Method Pattern to avoid this repetition.

## ❌ Bad Practice

```ts
const userInput = 'Google'; // user can send anything
let auth;
switch (userInput) {
  case 'Google':
    auth = new GoogleAuth();
  case 'Facebook':
    auth = new FacebookAuth();
  case 'LinkedIn':
    auth = new LinkedInAuth();
  default:
    throw new Error('Unsupported authentication type');
}
auth.authenticate();
```

## ✅ Good Practice

Now we can use the Factory Method Pattern to avoid this repetition. We can create a factory class that creates the authentication object based on the user input. This way, we can avoid repeating the decision in every place.

```ts
export type AuthType = 'Google' | 'Facebook' | 'LinkedIn';

export class AuthenticationFactory {
  static createAuthentication(type: AuthType): IOAuth {
    switch (type) {
      case 'Google':
        return new GoogleAuth();
      case 'Facebook':
        return new FacebookAuth();
      case 'LinkedIn':
        return new LinkedInAuth();
      default:
        throw new Error('Unsupported authentication type');
    }
  }
}

const typeUserInput: AuthType = 'Google'; // Change this to 'Facebook' or 'LinkedIn' to test other providers
const authProvider = AuthenticationFactory.createAuthentication(typeUserInput);
```

### Bonus Point

Some people create concrete factory class for each item. For the sake of simplicity, we will use a single factory class. Let's see a quick example:

```ts
interface AuthFactory {
  createAuthentication(): IOAuth;
}

class GoogleAuthFactory implements AuthFactory {
  createAuthentication(): IOAuth {
    return new GoogleAuth();
  }
}

class FacebookAuthFactory implements AuthFactory {
  createAuthentication(): IOAuth {
    return new FacebookAuth();
  }
}

class LinkedInAuthFactory implements AuthFactory {
  createAuthentication(): IOAuth {
    return new LinkedInAuth();
  }
}
```

### Comparison

🤔 When to Use Static vs Concrete Factory

| Use Case                          | Static Method     | Concrete Factory Class |
| --------------------------------- | ----------------- | ---------------------- |
| Simple scenarios                  | ✅ Preferred      | 🚫 Overkill            |
| Number of files/classes           | ✅ A few          | 🚫 So many             |
| Testing or mocking needed         | 🚫 Harder to mock | ✅ Easier to mock      |
| Multiple steps/config in creation | 🚫 Hard to manage | ✅ More structured     |
| Using DI (e.g., NestJS)           | 🚫 Not injectable | ✅ Fully DI-compatible |
| Open/Closed principle             | 🚫 Violating      | ✅ Not Violating       |

Let's see an example where concrete factory is preferred:

When your object creation logic is not a simple `new ClassName()`, for example:

```ts
class CustomGoogleAuthFactory extends AuthFactory {
  createAuth(): AuthStrategy {
    const auth = new GoogleAuth();
    // Add some custom setup logic
    console.log("Custom logic before returning GoogleAuth");
    return auth;
  }
}
```

### Conclusion

For simple scenarios, using a static method is a good choice. Carefully choice between static method and concrete factory class based on your project's requirements.
