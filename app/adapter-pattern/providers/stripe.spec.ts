import { Stripe } from "./stripe";

describe('Stripe Payment Gateways', () => {
  const stripe = new Stripe();

  it('should return a success message', () => {
    const result = stripe.payAmount(100);
    expect(result).toEqual(undefined);
  });
});
