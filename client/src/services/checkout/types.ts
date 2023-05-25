export interface IPaymentInfo {
  paymentId: string;
  paymentCreated: string;
  payeeName: string;
  payeeEmail: string;
  paymentCaptureId: string;
}

export interface ICreatedOrderData {
  paymentMethod: number;
  shippingAddress: string;
  receiverName: string;
  receiverPhone: string;
  paymentInfo?: IPaymentInfo | null;
}
