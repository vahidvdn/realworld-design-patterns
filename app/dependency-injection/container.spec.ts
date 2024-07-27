import { Container, Injectable } from "./container";

describe('Container', () => {
  @Injectable()
  class UserService {
    constructor() {}
    getUsers() {
      console.log('getUsers runs!');
    }
  }
  const app = new Container().init([UserService]);

  afterEach(() => {
    jest.clearAllMocks();
  });


  it('should be defined', () => {
    expect(Container).toBeDefined();
  });

  it('should be initialized', () => {
    const container = new Container();
    expect(container).toBeDefined();
  });

  it('should be injectable', () => {
    const userInstance = app.get(UserService);
    expect(userInstance).toBeDefined();
  });

  it('should return the same instance', () => {
    const userInstance = app.get(UserService);
    const secondInstance = app.get(UserService);
    expect(userInstance).toBe(secondInstance);
  })

  it('should return the different instance when create the instance manually', () => {
    const userInstance = new UserService();
    const secondInstance = app.get(UserService);
    expect(userInstance).not.toBe(secondInstance);
  })

  it('should not return instance if @Injectable is not applied', () => {
    class UserService { constructor() {} }
    const app = new Container().init([UserService]);
    const userInstance = app.get(UserService);
    expect(userInstance).not.toBeDefined();
  })

  it('should resolve dependencies of the class as well', () => {
    @Injectable()
    class OrderService {
      constructor() {}
      getOrders() {
        console.log('getting orders..!! 📦📦📦');
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

    const app = new Container().init([OrderService, UserService]);
    const userService = app.get(UserService);
    const orderInstance = app.get(OrderService);
    userService.getUsers();
    expect(orderInstance).toBeDefined();
    orderInstance.getOrders();
  })
})
