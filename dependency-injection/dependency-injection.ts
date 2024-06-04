import { Container, Injectable } from "./container";

@Injectable()
class ProductService {
  constructor() {}

  getProducts() {
    console.log('getting products..!! 🍊🍊🍊');
  }
}

@Injectable()
class OrderService {
  constructor(private productService: ProductService) {}

  getOrders() {
    console.log('getting orders..!! 📦📦📦');
    this.productService.getProducts();
  }
}


@Injectable()
class UserService {
  constructor(private orderService: OrderService) {}

  getUsers() {
    console.log('getUsers runs!');
    this.orderService.getOrders();
  }
}

const app = new Container().init([UserService]);
const userService = app.get(UserService);

userService.getUsers();