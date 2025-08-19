import { SubscriptionOrder } from './subscription-order';
import { PayPalPayment, StripePayment, BankTransferPayment } from './payment-methods';
import { Order } from './interface';

describe('SubscriptionOrder', () => {
  let consoleSpy: jest.SpyInstance;
  
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  
  afterEach(() => {
    consoleSpy.mockRestore();
  });
  
  it('should be defined', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'monthly');
    expect(order).toBeDefined();
  });
  
  it('should return correct order type', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'monthly');
    expect(order.getOrderType()).toBe('Subscription Order');
  });
  
  it('should process checkout correctly', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'monthly');
    
    const result = order.checkout(19.99);
    
    expect(result).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Processing subscription order with monthly frequency'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 19.99 using PayPal'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Subscription created with ID:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Next billing date:'));
  });
  
  it('should return subscription details', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'monthly');
    
    const details = order.getSubscriptionDetails();
    
    expect(details.frequency).toBe('monthly');
    expect(details.subscriptionId).toBeDefined();
    expect(details.nextBillingDate).toBeInstanceOf(Date);
  });
  
  it('should set next billing date correctly for monthly frequency', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'monthly');
    
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    const details = order.getSubscriptionDetails();
    
    // Compare month and year (ignoring day/time differences)
    expect(details.nextBillingDate.getMonth()).toBe(nextMonth.getMonth());
    expect(details.nextBillingDate.getFullYear()).toBe(nextMonth.getFullYear());
  });
  
  it('should set next billing date correctly for yearly frequency', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'yearly');
    
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    
    const details = order.getSubscriptionDetails();
    
    expect(details.nextBillingDate.getFullYear()).toBe(nextYear.getFullYear());
  });
  
  it('should set next billing date correctly for weekly frequency', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'weekly');
    
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    const details = order.getSubscriptionDetails();
    
    // Compare dates (allowing for small time differences)
    const dayDiff = Math.abs(details.nextBillingDate.getDate() - nextWeek.getDate());
    expect(dayDiff <= 1).toBe(true); // Allow 1 day difference due to month boundaries
  });
  
  it('should renew subscription correctly for monthly frequency', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'monthly');
    
    // Initial checkout
    order.checkout(19.99);
    
    // Get initial next billing date
    const initialDate = new Date(order.getSubscriptionDetails().nextBillingDate);
    
    // Renew subscription
    const renewResult = order.renewSubscription(19.99);
    
    expect(renewResult).toBe(true);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Renewing subscription:'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Next billing date updated to:'));
    
    // Get updated next billing date
    const updatedDate = new Date(order.getSubscriptionDetails().nextBillingDate);
    
    // Verify next billing date has been updated (should be 1 month later)
    const expectedMonth = (initialDate.getMonth() + 1) % 12;
    expect(updatedDate.getMonth()).toBe(expectedMonth);
  });
  
  it('should renew subscription correctly for yearly frequency', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'yearly');
    
    // Initial checkout
    order.checkout(199.99);
    
    // Get initial next billing date
    const initialDate = new Date(order.getSubscriptionDetails().nextBillingDate);
    
    // Renew subscription
    order.renewSubscription(199.99);
    
    // Get updated next billing date
    const updatedDate = new Date(order.getSubscriptionDetails().nextBillingDate);
    
    // Verify next billing date has been updated (should be 1 year later)
    expect(updatedDate.getFullYear()).toBe(initialDate.getFullYear() + 1);
  });
  
  it('should renew subscription correctly for weekly frequency', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'weekly');
    
    // Initial checkout
    order.checkout(4.99);
    
    // Get initial next billing date
    const initialDate = new Date(order.getSubscriptionDetails().nextBillingDate);
    
    // Renew subscription
    order.renewSubscription(4.99);
    
    // Get updated next billing date
    const updatedDate = new Date(order.getSubscriptionDetails().nextBillingDate);
    
    // Calculate expected date (7 days after initial date)
    const expectedDate = new Date(initialDate);
    expectedDate.setDate(initialDate.getDate() + 7);
    
    // Verify next billing date has been updated (should be 7 days later)
    // Compare dates (allowing for small time differences)
    const dayDiff = Math.abs(updatedDate.getDate() - expectedDate.getDate());
    expect(dayDiff <= 1).toBe(true); // Allow 1 day difference due to month boundaries
  });
  
  it('should work with different payment methods', () => {
    const paypal = new PayPalPayment('test@example.com');
    const stripe = new StripePayment('4242');
    const bank = new BankTransferPayment('123456789', 'Test Bank');
    
    const orderPaypal = new SubscriptionOrder(paypal, 'monthly');
    const orderStripe = new SubscriptionOrder(stripe, 'monthly');
    const orderBank = new SubscriptionOrder(bank, 'monthly');
    
    orderPaypal.checkout(19.99);
    orderStripe.checkout(19.99);
    orderBank.checkout(19.99);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 19.99 using PayPal'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 19.99 using Stripe'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 19.99 using Bank Transfer'));
  });

  it('should allow changing payment method', () => {
    const paypal = new PayPalPayment('test@example.com');
    const stripe = new StripePayment('4242');
    
    // Create order with PayPal initially
    const order = new SubscriptionOrder(paypal, 'monthly');
    order.checkout(19.99);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 19.99 using PayPal'));
    consoleSpy.mockClear();
    
    // Change payment method to Stripe
    order.setPaymentMethod(stripe);
    order.renewSubscription(19.99);
    
    // Should now use Stripe for payment
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Paid 19.99 using Stripe'));
  });
  
  it('should handle invalid frequency', () => {
    const paypal = new PayPalPayment('test@example.com');
    // @ts-ignore - Testing invalid frequency
    const order = new SubscriptionOrder(paypal, 'invalid');
    
    const details = order.getSubscriptionDetails();
    
    // The implementation keeps the invalid frequency as is
    expect(details.frequency).toBe('invalid');
    
    // Next billing date should still be set properly
    // Since it's not a recognized frequency, it won't adjust the date
    const today = new Date();
    
    // Verify the next billing date is set to something
    expect(details.nextBillingDate).toBeInstanceOf(Date);
  });
  
  it('should implement the Order abstract class correctly', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'monthly');
    
    // SubscriptionOrder should be an instance of Order
    expect(order).toBeInstanceOf(Order);
    
    // Should implement required methods
    expect(typeof order.getOrderType).toBe('function');
    expect(typeof order.checkout).toBe('function');
  });
  
  it('should handle multiple renewals correctly', () => {
    const paypal = new PayPalPayment('test@example.com');
    const order = new SubscriptionOrder(paypal, 'monthly');
    
    // Initial checkout
    order.checkout(19.99);
    
    // Get initial next billing date
    const initialDate = new Date(order.getSubscriptionDetails().nextBillingDate);
    
    // First renewal
    order.renewSubscription(19.99);
    
    // Second renewal
    order.renewSubscription(19.99);
    
    // Get updated next billing date after two renewals
    const updatedDate = new Date(order.getSubscriptionDetails().nextBillingDate);
    
    // Verify next billing date has been updated (should be 2 months later)
    const expectedMonth = (initialDate.getMonth() + 2) % 12;
    expect(updatedDate.getMonth()).toBe(expectedMonth);
    
    // If we crossed a year boundary, check the year was incremented
    if (initialDate.getMonth() + 2 > 11) {
      expect(updatedDate.getFullYear()).toBe(initialDate.getFullYear() + 1);
    }
  });
});
