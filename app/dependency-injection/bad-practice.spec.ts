import { User, Order } from "./bad-practice";

describe('Dependency bad practice', () => {
  jest.spyOn(Order.prototype, 'getOrderByUser').mockImplementation((id) => {
    return `mock order ${id}`
  });

  const user = new User();

  it('should pass', () => {
    expect(1).toBe(1);
    const result = user.getUser(1);
    expect(Order.prototype.getOrderByUser).toHaveBeenCalledTimes(1);
    expect(result).toEqual('mock order 1 for user');

  })
})
