import { PaymentMethod } from "../interface";

export class BankTransferPayment implements PaymentMethod {
  private accountNumber: string;
  private bankName: string;
  
  constructor(accountNumber: string, bankName: string) {
    this.accountNumber = accountNumber;
    this.bankName = bankName;
  }
  
  pay(amount: number): boolean {
    console.log(`Paid ${amount} using Bank Transfer to account: ${this.accountNumber} at ${this.bankName}`);
    // In a real implementation, this would initiate a bank transfer
    return true;
  }
  
  getPaymentDetails(): { provider: string; accountNumber: string; bankName: string } {
    return {
      provider: 'Bank Transfer',
      accountNumber: this.accountNumber,
      bankName: this.bankName
    };
  }
}
