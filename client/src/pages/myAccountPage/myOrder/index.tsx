import Loading from 'components/loading';
import { useEffectOnce } from 'hooks/useEffectOnce';
import OrderDataTable from 'pages/myAccountPage/myOrder/OrderDataTable';
import React from 'react';
import { getOrderThunk } from 'redux/checkoutManage/getOrderSlice';
import { getOrderSelector } from 'redux/checkoutManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const MyOrder = () => {
  const dispatch = useAppDispatch();
  const { isLoading, orderData } = useAppSelector(getOrderSelector);

  useEffectOnce(() => {
    if (!orderData.length) dispatch(getOrderThunk());
  });

  return (
    <>
      <div className='w-full space-y-8'>
        {orderData.length ? <OrderDataTable orderData={orderData} /> : <p className='text-center'>No order to show</p>}
      </div>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default MyOrder;
