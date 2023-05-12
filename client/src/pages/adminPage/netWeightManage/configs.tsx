import { ColumnsType } from 'antd/es/table';
import RemoveNetWeightButton from 'pages/adminPage/netWeightManage/removeNetWeightButton';
import UpdateNetWeightButton from 'pages/adminPage/netWeightManage/updateNetWeightButton';
import ViewNetWeightDetailButton from 'pages/adminPage/netWeightManage/viewNetWeightDetailButton';
import { INetWeightData } from 'services/netWeight';

export const columns: ColumnsType<INetWeightData> = [
  {
    title: 'Net Weight Id',
    dataIndex: 'netWeightId',
    key: 'netWeightId',
    defaultSortOrder: 'ascend',
    sorter: (prev: INetWeightData, next: INetWeightData) => prev.netWeightId - next.netWeightId,
    sortDirections: ['descend']
  },
  {
    title: 'Net Weight Label',
    dataIndex: 'netWeightLabel',
    key: 'netWeightLabel',
    sorter: (prev: INetWeightData, next: INetWeightData) => {
      if (prev.netWeightLabel < next.netWeightLabel) return -1;
      if (prev.netWeightLabel > next.netWeightLabel) return 1;

      return 0;
    }
  },
  {
    title: 'Net Weight Value',
    dataIndex: 'netWeightValue',
    key: 'netWeightValue',
    sorter: (prev: INetWeightData, next: INetWeightData) => prev.netWeightValue - next.netWeightValue
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div className='flex space-x-2'>
        <ViewNetWeightDetailButton netWeightData={record} />
        <UpdateNetWeightButton netWeightData={record} />
        <RemoveNetWeightButton netWeightId={record.netWeightId} netWeightLabel={record.netWeightLabel} />
      </div>
    )
  }
];
