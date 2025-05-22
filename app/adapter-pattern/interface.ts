export interface IPaymentGateway {
  pay(amount: number): void;
}
