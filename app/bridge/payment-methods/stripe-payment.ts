import { PaymentMethod } from "../interface";

export class StripePayment implements PaymentMethod {
  private cardLastFour: string;
  
  constructor(cardLastFour: string) {
    this.cardLastFour = cardLastFour;
  }
  
  pay(amount: number): boolean {
    console.log(`Paid ${amount} using Stripe card ending in: ${this.cardLastFour}`);
    // In a real implementation, this would make an API call to Stripe
    return true;
  }
  
  getPaymentDetails(): { provider: string; cardLastFour: string } {
    return {
      provider: 'Stripe',
      cardLastFour: this.cardLastFour
    };
  }
}
