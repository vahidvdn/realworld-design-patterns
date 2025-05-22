import { StripeAdapter } from "./adapters";
import { IPaymentGateway } from "./interface";
import { Adyen, PayPal, Stripe } from "./providers";

function checkout(paymentGateway: IPaymentGateway, amount: number) {
  paymentGateway.pay(amount);
}

const amountToPay = 150;

const paypal = new PayPal();
const adyen = new Adyen();

const stripe = new Stripe();
const stripeAdapted = new StripeAdapter(stripe);

checkout(paypal, amountToPay);  // Output: Paying €150 using PayPal.
checkout(adyen, amountToPay);   // Output: Paying €150 using Adyen.
checkout(stripeAdapted, amountToPay);  // Output: Paying €150 using Stripe (payAmount).
