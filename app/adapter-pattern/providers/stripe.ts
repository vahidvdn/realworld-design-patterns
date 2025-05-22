// Stripe.ts
export class Stripe {
  payAmount(amount: number): void {
    console.log(`Paying €${amount} using Stripe (payAmount).`);
  }
}
