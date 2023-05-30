import Loading from 'components/loading';
import SEO from 'components/seo';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { useGetCurrentUrl } from 'hooks/useGetCurrentUrl';
import OrderDataTable from 'pages/myAccountPage/myOrder/OrderDataTable';
import React from 'react';
import { getOrderThunk } from 'redux/checkoutManage/getOrderSlice';
import { getOrderSelector } from 'redux/checkoutManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const MyOrder = () => {
  const dispatch = useAppDispatch();
  const { isLoading, orderData } = useAppSelector(getOrderSelector);
  const pageUrl = useGetCurrentUrl();

  useEffectOnce(() => {
    if (!orderData.length) dispatch(getOrderThunk());
  });

  return (
    <>
      <SEO title='TWG Tea | My Orders' url={pageUrl} />
      <div className='w-full space-y-8'>
        {orderData.length ? <OrderDataTable orderData={orderData} /> : <p className='text-center'>No order to show</p>}
      </div>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default MyOrder;
