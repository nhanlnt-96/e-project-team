import React from 'react';
import { IOrderData } from 'services/checkout';

interface IProps {
  orderData: IOrderData;
}

const OrderDetail: React.FC<IProps> = ({ orderData }) => {
  return <div className='w-full'>

  </div>;
};

export default OrderDetail;
