import { ICategoryData } from 'services/category';

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

export interface IOrderItem {
  id: number;
  quantity: number;
  price: number;
  productName: string;
  productId: number;
  netWeightLabel: string;
  productCategoryDto: ICategoryData;
}

export interface IOrderPaymentInfo extends IPaymentInfo {
  id: number;
  orderId: number;
}

export interface IShippingInfo {
  shippingAddress: string;
  receiverName: string;
  receiverPhone: string;
}

export interface IOrderData {
  orderId: number;
  shippingStatus: number;
  paymentMethod: number;
  paymentStatus: number;
  shippingAddress: string;
  receiverName: string;
  receiverPhone: string;
  createdAt: string;
  paymentInfoDto: IOrderPaymentInfo | null;
  orderItems: IOrderItem[];
}
