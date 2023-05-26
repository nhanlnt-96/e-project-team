import { Collapse } from 'antd';
import CollapseComp from 'components/collapseComp';
import Loading from 'components/loading';
import { useEffectOnce } from 'hooks/useEffectOnce';
import OrderDetail from 'pages/myAccountPage/myOrder/OrderDetail';
import React from 'react';
import { getOrderThunk } from 'redux/checkoutManage/getOrderSlice';
import { getOrderSelector } from 'redux/checkoutManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const { Panel } = Collapse;

const MyOrder = () => {
  const dispatch = useAppDispatch();
  const { isLoading, orderData } = useAppSelector(getOrderSelector);

  useEffectOnce(() => {
    if (!orderData.length) dispatch(getOrderThunk());
  });

  return (
    <>
      <div className='w-full space-y-8'>
        {orderData.length ? (
          <CollapseComp>
            {orderData.map((order) => (
              <Panel key={order.orderId} header={`Order #${order.orderId}`}>
                <OrderDetail orderData={order} />
              </Panel>
            ))}
          </CollapseComp>
        ) : (
          <p className='text-center'>No order to show</p>
        )}
      </div>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default MyOrder;
