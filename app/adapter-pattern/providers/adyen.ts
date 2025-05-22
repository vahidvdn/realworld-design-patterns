// Adyen.ts
import { IPaymentGateway } from '../interface';

export class Adyen implements IPaymentGateway {
  pay(amount: number): void {
    console.log(`Paying €${amount} using Adyen.`);
  }
}
