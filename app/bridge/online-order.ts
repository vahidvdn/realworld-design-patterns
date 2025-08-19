import { Order, PaymentMethod } from "./interface";

export class OnlineOrder extends Order {
  private shippingAddress: string;
  private trackingNumber?: string;
  
  constructor(paymentMethod: PaymentMethod, shippingAddress: string) {
    super(paymentMethod);
    this.shippingAddress = shippingAddress;
  }
  
  checkout(amount: number): boolean {
    console.log("Processing online order with shipping to: " + this.shippingAddress);
    const paymentResult = this.paymentMethod.pay(amount);
    
    if (paymentResult) {
      // Generate a tracking number for the shipment
      this.trackingNumber = "TRK" + Math.floor(Math.random() * 1000000);
      console.log(`Order shipped with tracking number: ${this.trackingNumber}`);
    }
    
    return paymentResult;
  }
  
  getOrderType(): string {
    return "Online Order";
  }
  
  getShippingDetails(): { address: string; trackingNumber?: string } {
    return {
      address: this.shippingAddress,
      trackingNumber: this.trackingNumber
    };
  }
}
