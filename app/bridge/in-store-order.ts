import { Order, PaymentMethod } from "./interface";

export class InStoreOrder extends Order {
  private storeLocation: string;
  private receiptNumber: string;
  
  constructor(paymentMethod: PaymentMethod, storeLocation: string) {
    super(paymentMethod);
    this.storeLocation = storeLocation;
    this.receiptNumber = "REC" + Math.floor(Math.random() * 1000000);
  }
  
  checkout(amount: number): boolean {
    console.log(`Processing in-store order at location: ${this.storeLocation}`);
    const paymentResult = this.paymentMethod.pay(amount);
    
    if (paymentResult) {
      console.log(`Receipt issued: ${this.receiptNumber}`);
    }
    
    return paymentResult;
  }
  
  getOrderType(): string {
    return "In-Store Order";
  }
  
  getReceiptDetails(): { storeLocation: string; receiptNumber: string } {
    return {
      storeLocation: this.storeLocation,
      receiptNumber: this.receiptNumber
    };
  }
}
