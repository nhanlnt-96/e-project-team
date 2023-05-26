import DataTable from 'components/datatable';
import Title from 'components/title';
import { orderItemColumns, paymentInfoColumns, shippingInfoColumns } from 'pages/myAccountPage/myOrder/configs';
import React from 'react';
import { IOrderData, IOrderItem, IPaymentInfo, IShippingInfo } from 'services/checkout';
import { addPropertyKeyToArray } from 'utils/addPropertyKeyToArray';

interface IProps {
  orderData: IOrderData;
}

const OrderDetail: React.FC<IProps> = ({ orderData }) => {
  return (
    <div className='w-full space-y-6'>
      <div className='w-full space-y-2'>
        <Title subtitle='Shipping Info' subTitleClassName='text-black text-left font-normal uppercase border-b border-black/50' />
        <DataTable<IShippingInfo>
          data={[
            {
              receiverName: orderData.receiverName,
              receiverPhone: orderData.receiverPhone,
              shippingAddress: orderData.shippingAddress
            }
          ]}
          pagination={false}
          columns={shippingInfoColumns}
        />
      </div>
      {orderData.paymentInfoDto ? (
        <div className='w-full space-y-2'>
          <Title subtitle='Payment Info' subTitleClassName='text-black text-left font-normal uppercase border-b border-black/50' />
          <DataTable<Omit<IPaymentInfo, 'paymentCaptureId'>>
            data={[
              {
                paymentId: orderData.paymentInfoDto.paymentId,
                payeeName: orderData.paymentInfoDto.payeeName,
                payeeEmail: orderData.paymentInfoDto.payeeEmail,
                paymentCreated: orderData.paymentInfoDto.paymentCreated
              }
            ]}
            pagination={false}
            columns={paymentInfoColumns}
          />
        </div>
      ) : (
        <></>
      )}
      <div className='w-full space-y-2'>
        <Title subtitle='Order Items' subTitleClassName='text-black text-left font-normal uppercase border-b border-black/50' />
        <DataTable<IOrderItem> data={addPropertyKeyToArray<IOrderItem>(orderData.orderItems, 'id')} columns={orderItemColumns} />
      </div>
    </div>
  );
};

export default OrderDetail;
