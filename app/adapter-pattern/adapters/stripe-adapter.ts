import { IPaymentGateway } from '../interface';
import { Stripe } from '../providers/stripe';

export class StripeAdapter implements IPaymentGateway {
  constructor(private readonly stripe: Stripe) {}

  pay(amount: number): void {
    // Adapting Stripe's payAmount to the pay interface
    this.stripe.payAmount(amount);
  }
}
