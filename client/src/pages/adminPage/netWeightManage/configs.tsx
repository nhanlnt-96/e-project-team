import { ColumnsType } from 'antd/es/table';
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
    key: 'netWeightId',
    sorter: (prev: INetWeightData, next: INetWeightData) => {
      if (prev.netWeightLabel < next.netWeightLabel) return -1;
      if (prev.netWeightLabel > next.netWeightLabel) return 1;

      return 0;
    }
  },
  {
    title: 'Net Weight Value',
    dataIndex: 'netWeightValue',
    key: 'netWeightId',
    sorter: (prev: INetWeightData, next: INetWeightData) => prev.netWeightValue - next.netWeightValue
  },
  {
    title: 'Action',
    key: 'action'
  }
];
