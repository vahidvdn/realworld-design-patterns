import {
  OnlineOrderWithPayPal,
  OnlineOrderWithCreditCard,
  InStoreOrderWithPayPal,
  InStoreOrderWithCreditCard,
  SubscriptionOrderWithPayPal,
  SubscriptionOrderWithCreditCard
} from './bad-practice';

describe('Bad Practice - Class Explosion', () => {
  let consoleSpy: jest.SpyInstance;
  
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('Online Orders', () => {
    it('should process online order with PayPal', () => {
      const order = new OnlineOrderWithPayPal('123 Main St', 'test@example.com');
      const result = order.checkout(99.99);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing online order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 99.99 using PayPal'));
      
      const details = order.getOrderDetails();
      expect(details.type).toBe('Online Order');
      expect(details.paymentMethod).toBe('PayPal');
      expect(details.shippingAddress).toBe('123 Main St');
      expect(details.email).toBe('test@example.com');
    });

    it('should process online order with Credit Card', () => {
      const order = new OnlineOrderWithCreditCard('456 Oak Ave', '4242-4242-4242-4242');
      const result = order.checkout(149.99);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing online order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 149.99 using Credit Card'));
      
      const details = order.getOrderDetails();
      expect(details.type).toBe('Online Order');
      expect(details.paymentMethod).toBe('Credit Card');
      expect(details.shippingAddress).toBe('456 Oak Ave');
      expect(details.cardNumber).toBe('4242-4242-4242-4242');
    });
  });

  describe('In-Store Orders', () => {
    it('should process in-store order with PayPal', () => {
      const order = new InStoreOrderWithPayPal('Downtown Store', 'test@example.com');
      const result = order.checkout(50);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing in-store order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 50 using PayPal'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Receipt:'));
      
      const details = order.getOrderDetails();
      expect(details.type).toBe('In-Store Order');
      expect(details.paymentMethod).toBe('PayPal');
      expect(details.storeLocation).toBe('Downtown Store');
      expect(details.email).toBe('test@example.com');
      expect(details.receiptNumber).toBeDefined();
    });

    it('should process in-store order with Credit Card', () => {
      const order = new InStoreOrderWithCreditCard('Mall Store', '1234-5678-9012-3456');
      const result = order.checkout(75.50);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing in-store order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 75.5 using Credit Card'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Receipt:'));
      
      const details = order.getOrderDetails();
      expect(details.type).toBe('In-Store Order');
      expect(details.paymentMethod).toBe('Credit Card');
      expect(details.storeLocation).toBe('Mall Store');
      expect(details.cardNumber).toBe('1234-5678-9012-3456');
      expect(details.receiptNumber).toBeDefined();
    });
  });

  describe('Subscription Orders', () => {
    it('should process subscription order with PayPal - monthly frequency', () => {
      const order = new SubscriptionOrderWithPayPal('monthly', 'test@example.com');
      const result = order.checkout(19.99);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing subscription order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 19.99 using PayPal'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Subscription ID:'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Next billing date:'));
      
      const details = order.getOrderDetails();
      expect(details.type).toBe('Subscription Order');
      expect(details.paymentMethod).toBe('PayPal');
      expect(details.frequency).toBe('monthly');
      expect(details.email).toBe('test@example.com');
      expect(details.nextBillingDate).toBeInstanceOf(Date);
      expect(details.subscriptionId).toBeDefined();
    });

    it('should process subscription order with PayPal - yearly frequency', () => {
      const order = new SubscriptionOrderWithPayPal('yearly', 'test@example.com');
      const result = order.checkout(199.99);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing subscription order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 199.99 using PayPal'));
      
      const details = order.getOrderDetails();
      expect(details.frequency).toBe('yearly');
      
      // Verify yearly billing date calculation
      const today = new Date();
      const nextYear = new Date(today);
      nextYear.setFullYear(today.getFullYear() + 1);
      expect(details.nextBillingDate.getFullYear()).toBe(nextYear.getFullYear());
    });

    it('should process subscription order with Credit Card - monthly frequency', () => {
      const order = new SubscriptionOrderWithCreditCard('monthly', '9876-5432-1098-7654');
      const result = order.checkout(19.99);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing subscription order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 19.99 using Credit Card'));
      
      const details = order.getOrderDetails();
      expect(details.type).toBe('Subscription Order');
      expect(details.paymentMethod).toBe('Credit Card');
      expect(details.frequency).toBe('monthly');
      expect(details.cardNumber).toBe('9876-5432-1098-7654');
    });

    it('should process subscription order with Credit Card - yearly frequency', () => {
      const order = new SubscriptionOrderWithCreditCard('yearly', '9876-5432-1098-7654');
      const result = order.checkout(199.99);
      
      expect(result).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing subscription order'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 199.99 using Credit Card'));
      
      const details = order.getOrderDetails();
      expect(details.frequency).toBe('yearly');
      
      // Verify yearly billing date calculation
      const today = new Date();
      const nextYear = new Date(today);
      nextYear.setFullYear(today.getFullYear() + 1);
      expect(details.nextBillingDate.getFullYear()).toBe(nextYear.getFullYear());
    });
  });

  describe('Class Explosion Problem', () => {
    it('should demonstrate the class explosion problem', () => {
      // We have 2 payment methods and 3 order types = 6 different classes
      const classes = [
        OnlineOrderWithPayPal,
        OnlineOrderWithCreditCard,
        InStoreOrderWithPayPal,
        InStoreOrderWithCreditCard,
        SubscriptionOrderWithPayPal,
        SubscriptionOrderWithCreditCard
      ];
      
      // If we add just 1 more payment method, we'd need 3 more classes
      // If we add just 1 more order type, we'd need 2 more classes
      // This demonstrates the exponential growth problem
      
      expect(classes.length).toBe(6);
      
      // Each class has its own implementation of checkout and getOrderDetails
      // This leads to code duplication and maintenance issues
      const onlinePayPal = new OnlineOrderWithPayPal('Address', 'email');
      const inStorePayPal = new InStoreOrderWithPayPal('Store', 'email');
      
      // Cannot change payment method at runtime
      // This would require creating a new object of a different class
      expect(onlinePayPal.getOrderDetails().paymentMethod).toBe('PayPal');
      // No way to change to Credit Card without creating a new object
    });
  });
});
