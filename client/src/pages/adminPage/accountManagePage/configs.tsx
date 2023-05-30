import { ColumnsType } from 'antd/es/table';
import ViewAccountDetailButton from 'pages/adminPage/accountManagePage/viewAccountDetailButton';
import { IUserData } from 'services/authenticate';

export const columns: ColumnsType<IUserData> = [
  {
    title: 'Account Id',
    dataIndex: 'userId',
    key: 'userId',
    defaultSortOrder: 'ascend',
    sorter: (prev: IUserData, next: IUserData) => prev.userId - next.userId,
    sortDirections: ['descend']
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName',
    sorter: (prev: IUserData, next: IUserData) => {
      if (prev.fullName < next.fullName) return -1;
      if (prev.fullName > next.fullName) return 1;

      return 0;
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (prev: IUserData, next: IUserData) => {
      if (prev.email < next.email) return -1;
      if (prev.email > next.email) return 1;

      return 0;
    }
  },
  {
    title: 'Phone Number',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
    sorter: (prev: IUserData, next: IUserData) => {
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
        <ViewAccountDetailButton accountId={record.userId} />
      </div>
    )
  }
];
