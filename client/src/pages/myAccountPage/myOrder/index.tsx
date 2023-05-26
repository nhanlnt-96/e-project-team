import DataTable, { ExpandIcon } from 'components/datatable';
import Loading from 'components/loading';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { columns } from 'pages/myAccountPage/myOrder/configs';
import OrderDetail from 'pages/myAccountPage/myOrder/OrderDetail';
import React from 'react';
import { getOrderThunk } from 'redux/checkoutManage/getOrderSlice';
import { getOrderSelector } from 'redux/checkoutManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IOrderData } from 'services/checkout';
import { addPropertyKeyToArray } from 'utils/addPropertyKeyToArray';

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
          <DataTable<IOrderData>
            data={addPropertyKeyToArray<IOrderData>(orderData, 'orderId')}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => <OrderDetail orderData={record} />,
              expandIcon: ({ expanded, onExpand, record }) => <ExpandIcon expanded={expanded} onClick={(e) => onExpand(record, e)} />
            }}
          />
        ) : (
          <p className='text-center'>No order to show</p>
        )}
      </div>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default MyOrder;
