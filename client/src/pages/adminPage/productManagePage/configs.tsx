import { ColumnsType } from 'antd/es/table';
import EditProductButton from 'pages/adminPage/productManagePage/editProductPage/EditProductButton';
import RemoveProductButton from 'pages/adminPage/productManagePage/removeProductButton';
import ViewDetailProductButton from 'pages/adminPage/productManagePage/viewDetailProductButton';
import { IProductData } from 'services/product';
import { convertPrice } from 'utils/convertPrice';

export const columns: ColumnsType<IProductData> = [
  {
    title: 'Product Id',
    dataIndex: 'productId',
    defaultSortOrder: 'ascend',
    sorter: (prev, next) => prev.productId - next.productId,
    sortDirections: ['descend']
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
    sorter: (prev, next) => {
      if (prev.productName < next.productName) return -1;
      if (prev.productName > next.productName) return 1;

      return 0;
    }
  },
  {
    title: 'Product Price',
    dataIndex: 'productPrice',
    sorter: (prev, next) => prev.productPrice - next.productPrice,
    render: (_, record) => convertPrice(record.productPrice)
  },
  {
    title: 'Category Name',
    dataIndex: 'categoryName',
    sorter: (prev, next) => {
      if (prev.category.categoryName < next.category.categoryName) return -1;
      if (prev.category.categoryName > next.category.categoryName) return 1;

      return 0;
    },
    render: (_, record) => record.category.categoryName
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <div className='flex space-x-2'>
        <ViewDetailProductButton productData={record} />
        <EditProductButton productId={record.productId} />
        <RemoveProductButton productId={record.productId} productName={record.productName} />
      </div>
    )
  }
];
