import { ColumnsType } from 'antd/es/table';
import RemoveNewsButton from 'pages/adminPage/newsManagePage/removeNewsButton';
import UpdateNewsButton from 'pages/adminPage/newsManagePage/updateNewsButton';
import ViewNewsDetailButton from 'pages/adminPage/newsManagePage/viewNewsDetailButton';
import { INewsData } from 'services/news';

export const columns: ColumnsType<INewsData> = [
  {
    title: 'News Id',
    dataIndex: 'newsId',
    key: 'newsId',
    defaultSortOrder: 'ascend',
    sorter: (prev: INewsData, next: INewsData) => prev.newsId - next.newsId,
    sortDirections: ['descend']
  },
  {
    title: 'News Title',
    dataIndex: 'newsTitle',
    key: 'newsTitle',
    sorter: (prev: INewsData, next: INewsData) => {
      if (prev.newsTitle < next.newsTitle) return -1;
      if (prev.newsTitle > next.newsTitle) return 1;

      return 0;
    }
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div className='flex space-x-2'>
        <ViewNewsDetailButton newsData={record} />
        <UpdateNewsButton newsData={record} />
        <RemoveNewsButton newsTitle={record.newsTitle} newsId={record.newsId} />
      </div>
    )
  }
];
