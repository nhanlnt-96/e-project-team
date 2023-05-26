import { Collapse } from 'antd';
import CollapseComp from 'components/collapseComp';
import { useEffectOnce } from 'hooks/useEffectOnce';
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
    <div className='w-full space-y-8'>{orderData.length ? <CollapseComp></CollapseComp> : <p className='text-center'>No product to show</p>}</div>
  );
};

export default MyOrder;
