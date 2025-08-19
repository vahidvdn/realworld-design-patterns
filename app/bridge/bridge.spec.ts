import { 
  PayPalPayment, 
  StripePayment, 
  BankTransferPayment 
} from './payment-methods';
import { OnlineOrder } from './online-order';
import { InStoreOrder } from './in-store-order';
import { SubscriptionOrder } from './subscription-order';

describe('Bridge Pattern', () => {
  let consoleSpy: jest.SpyInstance;
  
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });
  
  describe('Payment Methods', () => {
    it('should create PayPal payment method', () => {
      const paypal = new PayPalPayment('test@example.com');
      expect(paypal).toBeDefined();
      expect(paypal.getPaymentDetails().provider).toBe('PayPal');
      expect(paypal.getPaymentDetails().email).toBe('test@example.com');
    });
    
    it('should create Stripe payment method', () => {
      const stripe = new StripePayment('1234');
      expect(stripe).toBeDefined();
      expect(stripe.getPaymentDetails().provider).toBe('Stripe');
      expect(stripe.getPaymentDetails().cardLastFour).toBe('1234');
    });
    
    it('should create Bank Transfer payment method', () => {
      const bank = new BankTransferPayment('987654321', 'Test Bank');
      expect(bank).toBeDefined();
      expect(bank.getPaymentDetails().provider).toBe('Bank Transfer');
      expect(bank.getPaymentDetails().accountNumber).toBe('987654321');
      expect(bank.getPaymentDetails().bankName).toBe('Test Bank');
    });
    
    it('should process payments correctly', () => {
      const paypal = new PayPalPayment('test@example.com');
      const result = paypal.pay(100);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 100 using PayPal'));
    });
  });
  
  describe('Order Types', () => {
    it('should create Online Order', () => {
      const paypal = new PayPalPayment('test@example.com');
      const order = new OnlineOrder(paypal, '123 Test St');
      
      expect(order).toBeDefined();
      expect(order.getOrderType()).toBe('Online Order');
      expect(order.getShippingDetails().address).toBe('123 Test St');
    });
    
    it('should create In-Store Order', () => {
      const stripe = new StripePayment('1234');
      const order = new InStoreOrder(stripe, 'Test Location');
      
      expect(order).toBeDefined();
      expect(order.getOrderType()).toBe('In-Store Order');
      expect(order.getReceiptDetails().storeLocation).toBe('Test Location');
    });
    
    it('should create Subscription Order', () => {
      const bank = new BankTransferPayment('987654321', 'Test Bank');
      const order = new SubscriptionOrder(bank, 'monthly');
      
      expect(order).toBeDefined();
      expect(order.getOrderType()).toBe('Subscription Order');
      expect(order.getSubscriptionDetails().frequency).toBe('monthly');
    });
  });
  
  describe('Bridge Pattern Integration', () => {
    it('should process online order with PayPal', () => {
      const paypal = new PayPalPayment('test@example.com');
      const order = new OnlineOrder(paypal, '123 Test St');
      
      const result = order.checkout(100);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing online order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 100 using PayPal'));
    });
    
    it('should process in-store order with Stripe', () => {
      const stripe = new StripePayment('1234');
      const order = new InStoreOrder(stripe, 'Test Location');
      
      const result = order.checkout(50);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing in-store order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 50 using Stripe'));
    });
    
    it('should process subscription order with Bank Transfer', () => {
      const bank = new BankTransferPayment('987654321', 'Test Bank');
      const order = new SubscriptionOrder(bank, 'monthly');
      
      const result = order.checkout(20);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing subscription order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 20 using Bank Transfer'));
    });
    
    it('should allow changing payment method at runtime', () => {
      const paypal = new PayPalPayment('test@example.com');
      const stripe = new StripePayment('1234');
      const order = new OnlineOrder(paypal, '123 Test St');
      
      // First checkout with PayPal
      order.checkout(100);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 100 using PayPal'));
      
      // Change payment method and checkout again
      order.setPaymentMethod(stripe);
      order.checkout(100);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 100 using Stripe'));
      
      // Verify payment details are updated
      const paymentDetails = order.getPaymentDetails();
      expect(paymentDetails.provider).toBe('Stripe');
    });
    
    it('should handle subscription renewal', () => {
      const bank = new BankTransferPayment('987654321', 'Test Bank');
      const order = new SubscriptionOrder(bank, 'monthly');
      
      // Initial checkout
      order.checkout(20);
      
      // Get initial next billing date
      const initialDate = new Date(order.getSubscriptionDetails().nextBillingDate);
      
      // Renew subscription
      order.renewSubscription(20);
      
      // Get updated next billing date
      const updatedDate = new Date(order.getSubscriptionDetails().nextBillingDate);
      
      // Verify next billing date has been updated (should be 1 month later)
      expect(updatedDate.getMonth()).toBe((initialDate.getMonth() + 1) % 12);
    });
  });
});
