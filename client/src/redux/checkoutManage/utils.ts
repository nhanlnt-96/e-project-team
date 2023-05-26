import _ from 'lodash';
import { IOrderData, IOrderItem, IOrderPaymentInfo } from 'services/checkout';
import { convertDate } from 'utils/convertDate';

export const generatePaymentInfoObject = (data: any): IOrderPaymentInfo | null => {
  return data
    ? {
        id: _.get(data, 'id', ''),
        paymentId: _.get(data, 'paymentId', ''),
        orderId: _.get(data, 'orderId', ''),
        paymentCaptureId: _.get(data, 'paymentCaptureId', ''),
        paymentCreated: data?.paymentCreated ? convertDate(data.paymentCreated) : '',
        payeeEmail: _.get(data, 'payeeEmail', ''),
        payeeName: _.get(data, 'payeeName', '')
      }
    : null;
};

export const generateOrderItemObject = (data: any): IOrderItem => ({
  id: _.get(data, 'id', ''),
  price: _.get(data, 'price', ''),
  netWeightLabel: _.get(data, 'netWeightLabel', ''),
  productName: _.get(data, 'productName', ''),
  quantity: _.get(data, 'quantity', '')
});

export const generateOrderDataObject = (data: any): IOrderData => ({
  orderId: _.get(data, 'id', 0),
  orderItems: data?.orderItems.length ? data.orderItems.map((item: any) => generateOrderItemObject(item)) : [],
  createdAt: data?.createdAt ? convertDate(data.createdAt) : '',
  paymentInfoDto: generatePaymentInfoObject(data?.paymentInfoDto),
  paymentMethod: _.get(data, 'paymentMethod', ''),
  paymentStatus: _.get(data, 'paymentStatus', ''),
  receiverName: _.get(data, 'receiverName', ''),
  receiverPhone: _.get(data, 'receiverPhone', ''),
  shippingAddress: _.get(data, 'shippingAddress', ''),
  shippingStatus: _.get(data, 'shippingStatus', '')
});
