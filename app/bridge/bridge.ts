import { 
  PayPalPayment, 
  StripePayment, 
  BankTransferPayment 
} from './payment-methods';
import { OnlineOrder } from './online-order';
import { InStoreOrder } from './in-store-order';
import { SubscriptionOrder } from './subscription-order';

// Create payment method instances
const paypalPayment = new PayPalPayment('customer@example.com');
const stripePayment = new StripePayment('4242');
const bankTransferPayment = new BankTransferPayment('123456789', 'First National Bank');

// Create order instances with different payment methods
const onlineOrder = new OnlineOrder(paypalPayment, '123 Main St, City, Country');
const inStoreOrder = new InStoreOrder(stripePayment, 'Downtown Store');
const subscriptionOrder = new SubscriptionOrder(bankTransferPayment, 'monthly');

// Process different types of orders with different payment methods
console.log('\n--- Processing Online Order with PayPal ---');
onlineOrder.checkout(99.99);
console.log('Payment details:', onlineOrder.getPaymentDetails());
console.log('Shipping details:', onlineOrder.getShippingDetails());

console.log('\n--- Processing In-Store Order with Stripe ---');
inStoreOrder.checkout(49.99);
console.log('Payment details:', inStoreOrder.getPaymentDetails());
console.log('Receipt details:', inStoreOrder.getReceiptDetails());

console.log('\n--- Processing Subscription Order with Bank Transfer ---');
subscriptionOrder.checkout(19.99);
console.log('Payment details:', subscriptionOrder.getPaymentDetails());
console.log('Subscription details:', subscriptionOrder.getSubscriptionDetails());

// Demonstrate changing payment method at runtime
console.log('\n--- Changing payment method for Online Order ---');
onlineOrder.setPaymentMethod(stripePayment);
onlineOrder.checkout(99.99);
console.log('New payment details:', onlineOrder.getPaymentDetails());

// Demonstrate subscription renewal
console.log('\n--- Renewing Subscription ---');
subscriptionOrder.renewSubscription(19.99);
console.log('Updated subscription details:', subscriptionOrder.getSubscriptionDetails());
