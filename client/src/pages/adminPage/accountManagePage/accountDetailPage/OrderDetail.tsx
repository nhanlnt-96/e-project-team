import { Spin } from 'antd';
import { useEffectOnce } from 'hooks/useEffectOnce';
import OrderDataTable from 'pages/myAccountPage/myOrder/OrderDataTable';
import React, { useState } from 'react';
import { generateOrderDataObject } from 'redux/checkoutManage/utils';
import { getOrderByUserService } from 'services/accountManage';
import { IOrderData } from 'services/checkout';

interface IProps {
  userId: number;
}

const OrderDetail: React.FC<IProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<IOrderData[]>([]);

  useEffectOnce(() => {
    setIsLoading(true);

    (async () => {
      try {
        const response = await getOrderByUserService(userId);
        if (response && response.length) {
          const orderDataTemp: IOrderData[] = [];
          for (const order of response) {
            orderDataTemp.push(generateOrderDataObject(order));
          }

          setOrderData(orderDataTemp);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  });

  return !isLoading ? (
    orderData.length ? (
      <OrderDataTable orderData={orderData} />
    ) : (
      <p className='text-center p-4'>No have order to display</p>
    )
  ) : (
    <div className='w-full flex justify-center items-center p-4'>
      <Spin size='default' className='spin-black' />
    </div>
  );
};

export default OrderDetail;
