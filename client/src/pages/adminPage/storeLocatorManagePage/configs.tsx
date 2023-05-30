import { ColumnsType } from 'antd/es/table';
import EditStoreButton from 'pages/adminPage/storeLocatorManagePage/editStorePage/EditStoreButton';
import RemoveStoreButton from 'pages/adminPage/storeLocatorManagePage/removeStoreLocatorButton';
import ViewStoreDetailButton from 'pages/adminPage/storeLocatorManagePage/viewStoreDetailButton';
import { IStoreLocatorData } from 'services/storeLocatorManage/types';

export const columns: ColumnsType<IStoreLocatorData> = [
  {
    title: 'Store Id',
    dataIndex: 'storeId',
    defaultSortOrder: 'ascend',
    sorter: (prev, next) => prev.storeId - next.storeId,
    sortDirections: ['descend']
  },
  {
    title: 'Store Name',
    dataIndex: 'storeName',
    sorter: (prev, next) => {
      if (prev.storeName < next.storeName) return -1;
      if (prev.storeName > next.storeName) return 1;

      return 0;
    }
  },
  {
    title: 'Store Address',
    dataIndex: 'address',
    sorter: (prev, next) => {
      if (prev.address < next.address) return -1;
      if (prev.address > next.address) return 1;

      return 0;
    }
  },
  {
    title: 'Store Phone Number',
    dataIndex: 'phoneNumber',
    sorter: (prev, next) => {
      if (prev.phoneNumber < next.phoneNumber) return -1;
      if (prev.phoneNumber > next.phoneNumber) return 1;

      return 0;
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div className='flex space-x-2'>
        <ViewStoreDetailButton storeData={record} />
        <EditStoreButton storeId={record.storeId} />
        <RemoveStoreButton storeId={record.storeId} storeName={record.storeName} />
      </div>
    )
  }
];
