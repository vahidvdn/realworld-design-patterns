// Payment method interface (Implementation)
export interface PaymentMethod {
  pay(amount: number): boolean;
  getPaymentDetails(): { provider: string; [key: string]: any };
}

// Order abstract class (Abstraction)
export abstract class Order {
  protected paymentMethod: PaymentMethod;

  constructor(paymentMethod: PaymentMethod) {
    this.paymentMethod = paymentMethod;
  }

  abstract checkout(amount: number): boolean;
  abstract getOrderType(): string;
  
  // Common functionality for all orders
  getPaymentDetails(): { provider: string; [key: string]: any } {
    return this.paymentMethod.getPaymentDetails();
  }
  
  // Change payment method at runtime
  setPaymentMethod(paymentMethod: PaymentMethod): void {
    this.paymentMethod = paymentMethod;
  }
}
