class Order {
  constructor() {}

  getOrderByUser(userId) {
    console.log('return order of user:', userId);
  }
}

class User {
  private order: Order;
  constructor() {
    this.order = new Order();
  }

  getUser(userId) {
    this.order.getOrderByUser(userId);
    console.log('return user and order of user with id:', userId);
  }
}

let user = new User();
let userId = 5;
user.getUser(userId);