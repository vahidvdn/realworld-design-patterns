# Prerequisites for Understanding Design Patterns

Before diving into design patterns, it’s important to have a solid grasp of a few core programming concepts and principles. This ensures that you can not only recognize patterns in real-world code but also apply them effectively.

# Table of Contents

- [Prerequisites for Understanding Design Patterns](#prerequisites-for-understanding-design-patterns)
- [Table of Contents](#table-of-contents)
  - [4 Pilars of OOP](#4-pilars-of-oop)
    - [1. Inheritance](#1-inheritance)
    - [2. Abstraction](#2-abstraction)
    - [3. Encapsulation](#3-encapsulation)
    - [4. Polymorphism](#4-polymorphism)
  - [SOLID Principles](#solid-principles)
    - [1. Single Responsibility Principle (SRP)](#1-single-responsibility-principle-srp)
    - [2. Open/Closed Principle (OCP)](#2-openclosed-principle-ocp)
    - [3. Liskov Substitution Principle (LSP)](#3-liskov-substitution-principle-lsp)
    - [4. Interface Segregation Principle (ISP)](#4-interface-segregation-principle-isp)
    - [5. Dependency Inversion Principle (DIP)](#5-dependency-inversion-principle-dip)
  - [Other](#other)
    - [1. Concrete Class](#1-concrete-class)
    - [2. Abstract Class](#2-abstract-class)
    - [3. Bad Practices](#3-bad-practices)

## 4 Pilars of OOP

### 1. Inheritance

Inheritance is a fundamental concept in Object-Oriented Programming (OOP). It allows one class (called a child or subclass) to inherit properties and behaviors (methods) from another class (called a parent or superclass).

Example of inheritance in Typescript:

```typescript
class User {
  firtName: string;
  lastName: string;

  constructor() {}

  getFullName(): string {
    return `${this.firtName} ${this.lastName}`;
  }
}

class Admin extends User {
  constructor() {
    super();
  }
} 
```

This mean Admin also has the same `getFullName` method because it inherits it from User (`extends User`). In the other word, we simply copied the `getFullName` method from User to Admin (without actually writing it again).

### 2. Abstraction

To abstract something away means to hide away the implementation details inside something. Here is an example of abstraction in Typescript:

```ts
class MusicPlayer {
  play(fileName: string) {
    this.loadFile(fileName);
    this.decodeFile(fileName);
    this.playAudio(fileName);
    console.log(`Now playing: ${fileName}`);
  }

  private loadFile(fileName: string) {
    console.log(`Loading file: ${fileName}`);
  }

  private decodeFile(fileName: string) {
    console.log(`Decoding file: ${fileName}`);
  }

  private playAudio(fileName: string) {
    console.log(`Streaming audio to speakers: ${fileName}`);
  }
}
```

Here how we abstract all the other functions with private keyword and we only expose the `play` method to the outside world. This is the same as the example above.

```ts
const player = new MusicPlayer();
player.play("song.mp3");
```


### 3. Encapsulation

Encapsulation is the concept of bundling data (variables) and the methods (functions) that operate on that data into a single unit—usually a class. It also involves restricting direct access to some of an object's internal components to protect the integrity of the object.

**Key Principles of Encapsulation**

1. Data Hiding
Use access modifiers (like private, protected, public) to hide the internal state of an object from the outside world.

2. Controlled Access
Provide public getter/setter methods to allow controlled access or updates to the private data.

**Benefits of Encapsulation** 

- Security: Prevents external code from putting the object in an invalid or inconsistent state.

- Maintainability: Internals can change without affecting external code (as long as the public interface stays the same).

- Reusability: Objects are more modular and easier to reuse.

- Abstraction Support: Works hand in hand with abstraction by exposing only necessary behavior.

Let's see an example of encapsulation in TypeScript:

```ts
class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }

  public withdraw(amount: number): boolean {
    if (amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  public getBalance(): number {
    return this.balance;
  }
}

```
❗ What if we make the `balance` property public?

If we expose balance as a public property, Then any code from outside the class can freely read and modify the balance, like:

```ts
const account = new BankAccount(1000);
// Directly changing balance — no validation or control
account.balance = -999999; // But this is not allowed
```

### 4. Polymorphism

Polymorphism is one of the core concepts of Object-Oriented Programming (OOP). It means "many forms" and allows objects of different types to be treated through the same interface. It promotes flexibility, extensibility, and code reuse.

✅ Let's see an example of polymorphism in TypeScript:

```ts
// Base interface (or abstract class)
interface Notifier {
  send(message: string): void;
}

// Email notification
class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending EMAIL: ${message}`);
    // actual email logic here
  }
}

// SMS notification
class SMSNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`);
    // actual SMS logic here
  }
}

// Push notification
class PushNotifier implements Notifier {
  send(message: string): void {
    console.log(`Sending PUSH notification: ${message}`);
    // actual push logic here
  }
}

// Polymorphic function 👇
function notifyUser(notifier: Notifier, message: string) {
  notifier.send(message); // we don’t care if it's email, sms, or push
}
```

Why Polymorphisim?

- You treat all notification types the same way via the Notifier interface.

- You can add new notification methods (e.g., Slack, WhatsApp) without touching notifyUser().

- It enables dependency injection, testing, and clean architecture.

❌ Without Polymorphism (Bad Design)

```ts
function notifyUser(type: string, message: string) {
  if (type === 'email') {
    console.log(`Sending EMAIL: ${message}`);
  } else if (type === 'sms') {
    console.log(`Sending SMS: ${message}`);
  } else if (type === 'push') {
    console.log(`Sending PUSH: ${message}`);
  }
}
```

- Harder to maintain.

- You must touch this function every time you add a new channel.

- No separation of responsibilities or testable units.

This is also called Open-Closed Principle (OCP) in the SOLID principles.

## SOLID Principles

The **SOLID** principles are five design principles that help developers create scalable and maintainable software systems.

---

### 1. Single Responsibility Principle (SRP)

> A class should have only one reason to change.

❌ Violation

```ts
class OrderService {
  createOrder() {
    // create order logic
  }

  sendEmailConfirmation() {
    // send email logic
  }
}
```

✅ Correct

```ts
class OrderService {
  createOrder() {
    // logic to create order
  }
}

class EmailService {
  sendConfirmationEmail() {
    // logic to send email
  }
}
```

### 2. Open/Closed Principle (OCP)

OCP is somehow related to Polymorphism. It states that software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. We saw an example previously. Let's see an example of OCP in TypeScript:

```ts
interface DiscountStrategy {
  getDiscount(): number;
}

class RegularCustomerDiscount implements DiscountStrategy {
  getDiscount() {
    return 0;
  }
}

class VipCustomerDiscount implements DiscountStrategy {
  getDiscount() {
    return 20;
  }
}

class DiscountService {
  constructor(private strategy: DiscountStrategy) {}

  getDiscount(): number {
    return this.strategy.getDiscount();
  }
}
```

You can now add new discount strategies by implementing DiscountStrategy, without touching DiscountService.

### 3. Liskov Substitution Principle (LSP)

Subtypes must be substitutable for their base types without breaking the application.


❌ Violation

```ts
class Bird {
  fly() {
    console.log("Flying");
  }
}

class Ostrich extends Bird {
  fly() {
    throw new Error("Ostriches can't fly!");
  }
}
```

This breaks expectations — not all birds can fly, so the base class is wrongly defined.

✅ Correct

```ts
interface Bird {
  layEggs(): void;
}

interface FlyingBird extends Bird {
  fly(): void;
}

class Sparrow implements FlyingBird {
  fly() {
    console.log("Flying");
  }

  layEggs() {}
}

class Ostrich implements Bird {
  layEggs() {}
}
```

### 4. Interface Segregation Principle (ISP)

Clients should not be forced to depend on methods they do not use.

❌ Violation

```ts
interface Worker {
  work(): void;
  eat(): void;
}

class Robot implements Worker {
  work() {}
  eat() {
    throw new Error("Robots don't eat!");
  }
}
```
Robots shouldn't be required to implement methods like eat() that don’t apply to them.

✅ Correct

```ts
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

class Human implements Workable, Eatable {
  work() {}
  eat() {}
}

class Robot implements Workable {
  work() {}
}
```

Each class now implements only the interfaces it actually needs.

### 5. Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules. Both should depend on abstractions. And: abstractions should not depend on details, but details should depend on abstractions.

❌ Violation

```ts
class MySQLDatabase {
  saveOrder(order: string) {
    console.log(`Saved ${order} to MySQL`);
  }
}

class OrderService {
  private db = new MySQLDatabase();

  save(order: string) {
    this.db.saveOrder(order);
  }
}
```

OrderService depends directly on a concrete implementation, making it hard to swap databases. For more info check [here](https://medium.com/@vahid.vdn/implement-a-dependency-injection-container-from-scratch-7092c8a0ae7a).

✅ Correct

```ts
interface Database {
  saveOrder(order: string): void;
}

class MySQLDatabase implements Database {
  saveOrder(order: string) {
    console.log(`Saved ${order} to MySQL`);
  }
}

class OrderService {
  constructor(private db: Database) {}

  save(order: string) {
    this.db.saveOrder(order);
  }
}
```

Now, OrderService depends on the Database abstraction, and you can easily swap in different implementations (e.g., MongoDB, PostgreSQL, InMemory).

## Other

### 1. Concrete Class

Basic Definition:

A concrete class is aClass that is fully implemented and can be instantiated directly, meaning you can create objects of this class using the keyword new. It contains no abstract methods; instead, all methods have complete implementations.

Definition in Design Patterns:

A Concrete Class refers to the Concrete Strategy — a class that implements the interface with real behavior. Example:

```ts
// Strategy interface
interface PaymentStrategy {
  pay(amount: number): void;
}

// Concrete strategy 1
class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid $${amount} with Credit Card`);
  }
}

// Concrete strategy 2
class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid $${amount} using PayPal`);
  }
}

// Context
class PaymentContext {
  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  executePayment(amount: number) {
    this.strategy.pay(amount);
  }
}

// Usage
const payment = new PaymentContext(new CreditCardPayment());
payment.executePayment(100); // Paid $100 with Credit Card

payment.setStrategy(new PayPalPayment());
payment.executePayment(75); // Paid $75 using PayPal
```

| Class               | Role                      |
| ------------------- | ------------------------- |
| `CreditCardPayment` | ✅ Concrete Strategy Class |
| `PayPalPayment`     | ✅ Concrete Strategy Class |
| `PaymentContext`    | Context                   |
| `PaymentStrategy`   | Interface (Strategy)      |

### 2. Abstract Class

An abstract class is a class that cannot be instantiated on its own and is meant to be extended by other classes. It acts as a blueprint for other classes.

Why Use Abstract Classes?

- To define a common interface and partial logic for a group of related classes.

- To force subclasses to implement specific behaviors.

- To avoid code duplication in subclasses.

Here is a simple example:

```ts
abstract class Animal {
  constructor(public name: string) {}

  // Abstract method (no body)
  abstract makeSound(): void;

  // Concrete method
  move(): void {
    console.log(`${this.name} moves`);
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log(`${this.name} says: Woof!`);
  }
}

const dog = new Dog("Buddy");
dog.move();       // Buddy moves
dog.makeSound();  // Buddy says: Woof!
```

### 3. Bad Practices

You can always check out the Bad Practices section in each design pattern section. Then it would be much easier to understand why this design pattern is introduced. Here is an example of a bad practice that decorator pattern is used to avoid:

![decorator-design-pattern](./assets/decorator.jpg)

If you can't find the bad practice in the diagram, then check the README.md file for that pattern.
