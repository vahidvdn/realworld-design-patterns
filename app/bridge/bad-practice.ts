/**
 * BAD PRACTICE: Class Explosion Problem
 * 
 * This file demonstrates the problem that the Bridge pattern solves.
 * Without the Bridge pattern, we need a separate class for each
 * combination of order type and payment method, leading to an explosion
 * of classes as we add more order types or payment methods.
 */

// Online Order with PayPal
export class OnlineOrderWithPayPal {
  constructor(private shippingAddress: string, private email: string) {}

  checkout(amount: number): boolean {
    console.log(`Processing online order with shipping to: ${this.shippingAddress}`);
    console.log(`Paid ${amount} using PayPal account: ${this.email}`);
    return true;
  }

  getOrderDetails() {
    return {
      type: 'Online Order',
      shippingAddress: this.shippingAddress,
      paymentMethod: 'PayPal',
      email: this.email
    };
  }
}

// Online Order with Credit Card
export class OnlineOrderWithCreditCard {
  constructor(private shippingAddress: string, private cardNumber: string) {}

  checkout(amount: number): boolean {
    console.log(`Processing online order with shipping to: ${this.shippingAddress}`);
    console.log(`Paid ${amount} using Credit Card: ${this.cardNumber}`);
    return true;
  }

  getOrderDetails() {
    return {
      type: 'Online Order',
      shippingAddress: this.shippingAddress,
      paymentMethod: 'Credit Card',
      cardNumber: this.cardNumber
    };
  }
}

// In-Store Order with PayPal
export class InStoreOrderWithPayPal {
  private receiptNumber: string;

  constructor(private storeLocation: string, private email: string) {
    this.receiptNumber = "REC" + Math.floor(Math.random() * 1000);
  }

  checkout(amount: number): boolean {
    console.log(`Processing in-store order at location: ${this.storeLocation}`);
    console.log(`Paid ${amount} using PayPal account: ${this.email}`);
    console.log(`Receipt: ${this.receiptNumber}`);
    return true;
  }

  getOrderDetails() {
    return {
      type: 'In-Store Order',
      storeLocation: this.storeLocation,
      paymentMethod: 'PayPal',
      email: this.email,
      receiptNumber: this.receiptNumber
    };
  }
}

// In-Store Order with Credit Card
export class InStoreOrderWithCreditCard {
  private receiptNumber: string;

  constructor(private storeLocation: string, private cardNumber: string) {
    this.receiptNumber = "REC" + Math.floor(Math.random() * 1000);
  }

  checkout(amount: number): boolean {
    console.log(`Processing in-store order at location: ${this.storeLocation}`);
    console.log(`Paid ${amount} using Credit Card: ${this.cardNumber}`);
    console.log(`Receipt: ${this.receiptNumber}`);
    return true;
  }

  getOrderDetails() {
    return {
      type: 'In-Store Order',
      storeLocation: this.storeLocation,
      paymentMethod: 'Credit Card',
      cardNumber: this.cardNumber,
      receiptNumber: this.receiptNumber
    };
  }
}

// Subscription Order with PayPal
export class SubscriptionOrderWithPayPal {
  private nextBillingDate: Date;
  private subscriptionId: string;

  constructor(private frequency: string, private email: string) {
    this.subscriptionId = "SUB" + Math.floor(Math.random() * 1000);
    
    // Set next billing date based on frequency
    const today = new Date();
    this.nextBillingDate = new Date(today);
    
    if (frequency === 'monthly') {
      this.nextBillingDate.setMonth(today.getMonth() + 1);
    } else if (frequency === 'yearly') {
      this.nextBillingDate.setFullYear(today.getFullYear() + 1);
    }
  }

  checkout(amount: number): boolean {
    console.log(`Processing subscription order with ${this.frequency} frequency`);
    console.log(`Paid ${amount} using PayPal account: ${this.email}`);
    console.log(`Subscription ID: ${this.subscriptionId}`);
    console.log(`Next billing date: ${this.nextBillingDate.toLocaleDateString()}`);
    return true;
  }

  getOrderDetails() {
    return {
      type: 'Subscription Order',
      frequency: this.frequency,
      paymentMethod: 'PayPal',
      email: this.email,
      nextBillingDate: this.nextBillingDate,
      subscriptionId: this.subscriptionId
    };
  }
}

// Subscription Order with Credit Card
export class SubscriptionOrderWithCreditCard {
  private nextBillingDate: Date;
  private subscriptionId: string;

  constructor(private frequency: string, private cardNumber: string) {
    this.subscriptionId = "SUB" + Math.floor(Math.random() * 1000);
    
    // Set next billing date based on frequency
    const today = new Date();
    this.nextBillingDate = new Date(today);
    
    if (frequency === 'monthly') {
      this.nextBillingDate.setMonth(today.getMonth() + 1);
    } else if (frequency === 'yearly') {
      this.nextBillingDate.setFullYear(today.getFullYear() + 1);
    }
  }

  checkout(amount: number): boolean {
    console.log(`Processing subscription order with ${this.frequency} frequency`);
    console.log(`Paid ${amount} using Credit Card: ${this.cardNumber}`);
    console.log(`Subscription ID: ${this.subscriptionId}`);
    console.log(`Next billing date: ${this.nextBillingDate.toLocaleDateString()}`);
    return true;
  }

  getOrderDetails() {
    return {
      type: 'Subscription Order',
      frequency: this.frequency,
      paymentMethod: 'Credit Card',
      cardNumber: this.cardNumber,
      nextBillingDate: this.nextBillingDate,
      subscriptionId: this.subscriptionId
    };
  }
}
