import { ColumnsType } from 'antd/es/table';
import ViewDetailCategoryBtn from 'pages/adminPage/categoryManage/viewDetailCategoryBtn';
import { ICategoryData } from 'services/category';

export const columns: ColumnsType<ICategoryData> = [
  {
    title: 'Category Id',
    dataIndex: 'categoryId',
    key: 'categoryId',
    defaultSortOrder: 'ascend',
    sorter: (prev, next) => prev.categoryId - next.categoryId,
    sortDirections: ['descend']
  },
  {
    title: 'Category Name',
    dataIndex: 'categoryName',
    key: 'categoryName',
    sorter: (prev, next) => {
      if (prev.categoryName < next.categoryName) return -1;
      if (prev.categoryName > next.categoryName) return 1;

      return 0;
    }
  },
  {
    title: 'Category Slug',
    dataIndex: 'categorySlug',
    key: 'categorySlug'
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div className='flex space-x-2'>
        <ViewDetailCategoryBtn categoryData={record} />
      </div>
    )
  }
];