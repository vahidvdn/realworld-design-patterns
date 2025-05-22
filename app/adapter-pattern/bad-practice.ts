class PayPal {
  pay(amount: number): void {
    console.log(`Paying €${amount} with PayPal`);
  }
}

class Adyen {
  pay(amount: number): void {
    console.log(`Paying €${amount} with Adyen`);
  }
}

class Stripe {
  payAmount(amount: number): void {
    console.log(`Paying €${amount} with Stripe`);
  }
}

type PaymentMethod = 'paypal' | 'adyen' | 'stripe';

function checkout(method: PaymentMethod, amount: number) {
  if (method === 'paypal') {
    const paypal = new PayPal();
    paypal.pay(amount);
  } else if (method === 'adyen') {
    const adyen = new Adyen();
    adyen.pay(amount);
  } else if (method === 'stripe') {
    const stripe = new Stripe();
    stripe.payAmount(amount); // 👈 Stripe has a different interface
  }
}

const amountToPay = 150;
checkout('paypal', amountToPay);  // Output: Paying €150 with PayPal
checkout('adyen', amountToPay);   // Output: Paying €150 with Adyen
checkout('stripe', amountToPay); // Output: Paying €150 with Stripe
