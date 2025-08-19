# 📚 Decorator Pattern
![decorator-design-pattern](../../assets/decorator.jpg)

## 💡 Use Case

Let's say you want publish an event in your CQRS architecture (or any other event driven system). At the same time you want to do some stuff with your event payload. (e.g. Store it in your MongoDB database or log it in your log system).

## ❌ Bad Practice

The routine way is to call `publish` method and after that you call your other functions like `Db.save()`. But there are some drawbacks:

- You may forgot in some point to do your stuff. (Or make it hard to trace everywhere)
- It's frustrating to repeat it everywhere. (you may decide to change your logger system)

This is the code for bad practice:

```typescript
const event = new Event();
const payload = { name: 'John Doe' };

event.publish(payload);

// NOTE: can be forgotten!
const db = new DB();
db.save(payload);
```


## ✅ Good Practice

In this pattern, we wrap or "decorate" an existing class to add additional functionality without modifying the original code. In our case, we create a new class (`StorableEvent`) that wraps the functionality of the original `Event` class. The `StorableEvent` class first stores the event in the database and then publishes it, effectively adding new behavior (storing the event) to the existing functionality (publishing the event).

```typescript
const event = new Event();
const db = new DB();

const storableEvent = new StorableEvent(event, db);
storableEvent.publish({ name: 'Vahid Najafi' });
```

See the code for more details like how we used interface and using both storable and loggable class at the same time.

🔗 Related Patterns:

- [Proxy Pattern](../proxy/README.md): Decorator Pattern add an extra behavior to the existing class e.g. we added saving ability to the original object (Event class) by introducing StorableEvent class. However, Proxy Pattern is used to have a limited access to the original object.
