import { Order, PaymentMethod } from "./interface";

export class SubscriptionOrder extends Order {
  private frequency: string;
  private nextBillingDate: Date;
  private subscriptionId: string;
  
  constructor(paymentMethod: PaymentMethod, frequency: string) {
    super(paymentMethod);
    this.frequency = frequency;
    this.subscriptionId = "SUB" + Math.floor(Math.random() * 1000000);
    
    // Set next billing date based on frequency
    const today = new Date();
    this.nextBillingDate = new Date(today);
    
    if (frequency === 'monthly') {
      this.nextBillingDate.setMonth(today.getMonth() + 1);
    } else if (frequency === 'yearly') {
      this.nextBillingDate.setFullYear(today.getFullYear() + 1);
    } else if (frequency === 'weekly') {
      this.nextBillingDate.setDate(today.getDate() + 7);
    }
  }
  
  checkout(amount: number): boolean {
    console.log(`Processing subscription order with ${this.frequency} frequency`);
    const paymentResult = this.paymentMethod.pay(amount);
    
    if (paymentResult) {
      console.log(`Subscription created with ID: ${this.subscriptionId}`);
      console.log(`Next billing date: ${this.nextBillingDate.toLocaleDateString()}`);
    }
    
    return paymentResult;
  }
  
  getOrderType(): string {
    return "Subscription Order";
  }
  
  getSubscriptionDetails(): { frequency: string; nextBillingDate: Date; subscriptionId: string } {
    return {
      frequency: this.frequency,
      nextBillingDate: this.nextBillingDate,
      subscriptionId: this.subscriptionId
    };
  }
  
  renewSubscription(amount: number): boolean {
    console.log(`Renewing subscription: ${this.subscriptionId}`);
    const paymentResult = this.paymentMethod.pay(amount);
    
    if (paymentResult) {
      // Update next billing date
      const currentDate = new Date(this.nextBillingDate);
      
      if (this.frequency === 'monthly') {
        this.nextBillingDate.setMonth(currentDate.getMonth() + 1);
      } else if (this.frequency === 'yearly') {
        this.nextBillingDate.setFullYear(currentDate.getFullYear() + 1);
      } else if (this.frequency === 'weekly') {
        this.nextBillingDate.setDate(currentDate.getDate() + 7);
      }
      
      console.log(`Next billing date updated to: ${this.nextBillingDate.toLocaleDateString()}`);
    }
    
    return paymentResult;
  }
}
