import { StripeAdapter } from "./adapters";
import { IPaymentGateway } from "./interface";
import { Adyen, PayPal, Stripe } from "./providers";

describe('Payment Gateways', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should pay using PayPal', () => {
    const paypal: IPaymentGateway = new PayPal();
    paypal.pay(100);

    expect(consoleSpy).toHaveBeenCalledWith('Paying €100 using PayPal.');
  });

  it('should pay using Adyen', () => {
    const adyen: IPaymentGateway = new Adyen();
    adyen.pay(200);

    expect(consoleSpy).toHaveBeenCalledWith('Paying €200 using Adyen.');
  });

  it('should adapt Stripe\'s payAmount to pay()', () => {
    const stripeMock: Stripe = {
      payAmount: jest.fn().mockImplementation(() => {
        console.log('Paying €300 using Stripe (payAmount).');
      })
    };

    const payAmountSpy = jest.spyOn(stripeMock, 'payAmount');
    const stripeAdapter: IPaymentGateway = new StripeAdapter(stripeMock);
    stripeAdapter.pay(300);

    expect(payAmountSpy).toHaveBeenCalledWith(300);
    expect(consoleSpy).toHaveBeenCalledWith('Paying €300 using Stripe (payAmount).');
  });
});
