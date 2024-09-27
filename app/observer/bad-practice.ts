export class Cache {
  constructor() {}

  save(payload: any) {
    console.log('I am saving cache', payload);
    return true;
  }
}

export class Db {
  constructor() {}

  update(payload: any) {
    console.log('I am updating db', payload);
    return true;
  }
}

export class Customers {
  constructor() {}

  sendPush(payload: any) {
    console.log('I am sending push to customers', payload);
    return true;
  }
}

const product = {
  id: 1,
  title: 'New Product',
  body: 'This is a new product for 2025.',
};

const db = new Db();
const cache = new Cache();
const customers = new Customers();

db.update(product);
cache.save(product);
customers.sendPush(product);
