export class Order {
  constructor() {}

  getOrderByUser(userId) {
    return `return order of user:${userId}`;
  }
}

export class User {
  private order: Order;
  constructor() {
    this.order = new Order();
  }

  getUser(userId) {
    const order = this.order.getOrderByUser(userId);
    console.log('return user and order of user with id:', userId);
    return order + ' for user'
  }
}

let user = new User();
let userId = 5;
user.getUser(userId);
