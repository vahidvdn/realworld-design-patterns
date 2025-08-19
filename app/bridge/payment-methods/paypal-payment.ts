import { PaymentMethod } from "../interface";

export class PayPalPayment implements PaymentMethod {
  private email: string;
  
  constructor(email: string) {
    this.email = email;
  }
  
  pay(amount: number): boolean {
    console.log(`Paid ${amount} using PayPal account: ${this.email}`);
    // In a real implementation, this would make an API call to PayPal
    return true;
  }
  
  getPaymentDetails(): { provider: string; email: string } {
    return {
      provider: 'PayPal',
      email: this.email
    };
  }
}
