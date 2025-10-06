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
  - [Programming Principles](#programming-principles)
    - [1. KISS (Keep It Simple, Stupid)](#1-kiss-keep-it-simple-stupid)
    - [2. DRY (Don't Repeat Yourself)](#2-dry-dont-repeat-yourself)
    - [3. YAGNI (You Aren't Gonna Need It)](#3-yagni-you-arent-gonna-need-it)
    - [4. Cross-Cutting Concerns](#4-cross-cutting-concerns)
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

## Programming Principles

### 1. KISS (Keep It Simple, Stupid)

KISS is a design principle that states that systems work best when they are kept simple rather than made complicated. Simplicity should be a key goal in design, and unnecessary complexity should be avoided.

**Key Principles of KISS**

1. Avoid unnecessary complexity
2. Use the simplest solution that meets the requirements
3. Break complex problems into smaller, simpler parts

**Benefits of KISS**

- Easier to understand and maintain
- Fewer bugs and issues
- Faster development
- Better user experience

❌ Violation

```ts
function calculateDiscount(price: number, userType: string, purchaseHistory: any[], seasonalPromotion: boolean): number {
  let discount = 0;
  
  // Complex nested conditions
  if (userType === 'premium') {
    if (purchaseHistory.length > 10) {
      discount = price * 0.2;
      if (seasonalPromotion) {
        discount += price * 0.05;
      }
    } else {
      discount = price * 0.1;
      if (seasonalPromotion) {
        discount += price * 0.02;
      }
    }
  } else if (userType === 'regular') {
    if (purchaseHistory.length > 20) {
      discount = price * 0.15;
      if (seasonalPromotion) {
        discount += price * 0.03;
      }
    } else {
      discount = price * 0.05;
      if (seasonalPromotion) {
        discount += price * 0.01;
      }
    }
  }
  
  return discount;
}
```

✅ Correct (KISS approach)

```ts
interface DiscountRule {
  userType: string;
  minPurchases: number;
  baseDiscount: number;
  seasonalBonus: number;
}

const discountRules: DiscountRule[] = [
  { userType: 'premium', minPurchases: 10, baseDiscount: 0.2, seasonalBonus: 0.05 },
  { userType: 'premium', minPurchases: 0, baseDiscount: 0.1, seasonalBonus: 0.02 },
  { userType: 'regular', minPurchases: 20, baseDiscount: 0.15, seasonalBonus: 0.03 },
  { userType: 'regular', minPurchases: 0, baseDiscount: 0.05, seasonalBonus: 0.01 },
];

function calculateDiscount(price: number, userType: string, purchaseCount: number, seasonalPromotion: boolean): number {
  // Find the applicable rule
  const rule = discountRules.find(r => 
    r.userType === userType && purchaseCount >= r.minPurchases
  );
  
  if (!rule) return 0;
  
  // Simple calculation
  let discount = price * rule.baseDiscount;
  if (seasonalPromotion) {
    discount += price * rule.seasonalBonus;
  }
  
  return discount;
}
```

### 2. DRY (Don't Repeat Yourself)

DRY is a principle aimed at reducing repetition of code. The principle states that "Every piece of knowledge must have a single, unambiguous, authoritative representation within a system."

**Key Principles of DRY**

1. Avoid code duplication
2. Abstract common functionality
3. Use functions, classes, and modules to encapsulate reusable code

**Benefits of DRY**

- Easier maintenance (change in one place affects all uses)
- Reduced chance of bugs
- Smaller codebase
- Better organization

❌ Violation (WET - Write Everything Twice)

```ts
function validateUserEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateAdminEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateCustomerEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

✅ Correct (DRY approach)

```ts
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Now use the single function for all email validations
function validateUserEmail(email: string): boolean {
  return validateEmail(email);
}

function validateAdminEmail(email: string): boolean {
  return validateEmail(email);
}

function validateCustomerEmail(email: string): boolean {
  return validateEmail(email);
}
```

Or even better, eliminate the redundant wrapper functions entirely if they don't add any value.

### 3. YAGNI (You Aren't Gonna Need It)

YAGNI is a principle that states that you shouldn't add functionality until it's necessary. It's about avoiding over-engineering and focusing on the current requirements rather than potential future needs.

**Key Principles of YAGNI**

1. Implement features only when they are needed, not when you think they might be needed
2. Avoid speculative coding
3. Focus on solving the current problem

**Benefits of YAGNI**

- Reduced complexity
- Less code to maintain
- Faster development of essential features
- More focused codebase

❌ Violation

```ts
class UserService {
  constructor(
    private database: Database,
    private logger: Logger,
    private emailService: EmailService,
    private smsService: SMSService,  // Not used yet
    private pushNotificationService: PushNotificationService,  // Not used yet
    private analyticsService: AnalyticsService,  // Not used yet
    private translationService: TranslationService,  // Not used yet
  ) {}

  async createUser(userData: UserData): Promise<User> {
    this.logger.log('Creating user');
    const user = await this.database.users.create(userData);
    await this.emailService.sendWelcomeEmail(user.email);
    return user;
  }

  // Methods for future features that aren't implemented yet
  async sendPasswordResetLink() { /* future implementation */ }
  async exportUserData() { /* future implementation */ }
  async generateUserReport() { /* future implementation */ }
}
```

✅ Correct (YAGNI approach)

```ts
class UserService {
  constructor(
    private database: Database,
    private logger: Logger,
    private emailService: EmailService,
  ) {}

  async createUser(userData: UserData): Promise<User> {
    this.logger.log('Creating user');
    const user = await this.database.users.create(userData);
    await this.emailService.sendWelcomeEmail(user.email);
    return user;
  }
  
  // Only implement additional methods when they're actually needed
}
```

### 4. Cross-Cutting Concerns

Cross-cutting concerns are aspects of a program that affect other concerns. These concerns often cannot be cleanly decomposed from the rest of the system and can result in code tangling or scattering.

**Common Cross-Cutting Concerns**

1. Logging
2. Security (authentication and authorization)
3. Data validation
4. Exception handling
5. Caching
6. Performance monitoring
7. Transaction management

**Approaches to Handle Cross-Cutting Concerns**

1. Aspect-Oriented Programming (AOP)
2. Middleware
3. Decorators
4. Higher-Order Functions

❌ Violation (Tangled concerns)

```ts
class OrderService {
  async createOrder(orderData: OrderData, user: User): Promise<Order> {
    console.log(`Creating order for user ${user.id}`); // Logging concern
    
    // Authentication concern
    if (!user.isAuthenticated) {
      throw new Error('User not authenticated');
    }
    
    // Authorization concern
    if (!user.hasPermission('create:order')) {
      throw new Error('User not authorized to create orders');
    }
    
    // Validation concern
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    
    // Transaction concern
    const transaction = await db.beginTransaction();
    try {
      const order = await db.orders.create(orderData);
      
      // Performance monitoring concern
      const startTime = Date.now();
      await this.processPayment(order);
      const endTime = Date.now();
      console.log(`Payment processing took ${endTime - startTime}ms`);
      
      await transaction.commit();
      
      // Caching concern
      cache.set(`order:${order.id}`, order);
      
      return order;
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating order:', error); // Error handling concern
      throw error;
    }
  }
}
```

✅ Correct (Separated concerns)

```ts
// Authentication middleware
function authMiddleware(req, res, next) {
  if (!req.user.isAuthenticated) {
    return res.status(401).send('Not authenticated');
  }
  next();
}

// Authorization middleware
function authorizationMiddleware(permission) {
  return (req, res, next) => {
    if (!req.user.hasPermission(permission)) {
      return res.status(403).send('Not authorized');
    }
    next();
  };
}

// Validation decorator
function validateOrderData(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(orderData: OrderData, ...args: any[]) {
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    return originalMethod.apply(this, [orderData, ...args]);
  };
  
  return descriptor;
}

// Transaction decorator
function transactional(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = async function(...args: any[]) {
    const transaction = await db.beginTransaction();
    try {
      const result = await originalMethod.apply(this, args);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  };
  
  return descriptor;
}

// Logging aspect
function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Method ${propertyKey} returned:`, result);
    return result;
  };
  
  return descriptor;
}

class OrderService {
  @logMethod
  @transactional
  @validateOrderData
  async createOrder(orderData: OrderData, user: User): Promise<Order> {
    // Core business logic only
    const order = await db.orders.create(orderData);
    await this.processPayment(order);
    return order;
  }
}

// Usage in Express.js route
app.post('/orders', 
  authMiddleware, 
  authorizationMiddleware('create:order'),
  async (req, res) => {
    const orderService = new OrderService();
    const order = await orderService.createOrder(req.body, req.user);
    res.json(order);
  }
);
```

By separating cross-cutting concerns, the core business logic becomes cleaner and more focused, while the cross-cutting concerns are handled in a centralized, reusable way.

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
