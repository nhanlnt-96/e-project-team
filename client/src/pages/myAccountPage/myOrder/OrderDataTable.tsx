import DataTable, { ExpandIcon } from 'components/datatable';
import { columns } from 'pages/myAccountPage/myOrder/configs';
import OrderDetail from 'pages/myAccountPage/myOrder/OrderDetail';
import React from 'react';
import { IOrderData } from 'services/checkout';
import { addPropertyKeyToArray } from 'utils/addPropertyKeyToArray';

interface IProps {
  orderData: IOrderData[];
}

const OrderDataTable: React.FC<IProps> = ({ orderData }) => {
  return (
    <DataTable<IOrderData>
      data={addPropertyKeyToArray<IOrderData>(orderData, 'orderId')}
      columns={columns}
      expandable={{
        expandedRowRender: (record) => <OrderDetail orderData={record} />,
        expandIcon: ({ expanded, onExpand, record }) => <ExpandIcon expanded={expanded} onClick={(e) => onExpand(record, e)} />
      }}
    />
  );
};

export default OrderDataTable;
