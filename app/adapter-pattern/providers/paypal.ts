import { IPaymentGateway } from '../interface';

export class PayPal implements IPaymentGateway {
  pay(amount: number): void {
    console.log(`Paying €${amount} using PayPal.`);
  }
}
