import { Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Checkout, RouteBasePath } from 'constants/index';
import React from 'react';
import { Link } from 'react-router-dom';
import { IOrderData, IOrderItem, IPaymentInfo, IShippingInfo } from 'services/checkout';
import { convertPrice } from 'utils/convertPrice';

export const columns: ColumnsType<IOrderData> = [
  {
    title: 'Order Id',
    dataIndex: 'orderId',
    defaultSortOrder: 'ascend',
    sorter: (prev, next) => prev.orderId - next.orderId,
    sortDirections: ['descend'],
    render: (_, record) => <p className='font-medium'>#{record.orderId}</p>
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt'
  },
  {
    title: 'Items',
    dataIndex: 'orderItems',
    render: (_, record) => record.orderItems.length
  },
  {
    title: 'Payment Method',
    dataIndex: 'paymentMethod',
    render: (_, record) => (record.paymentMethod === Checkout.PAYMENT_METHOD_COD ? 'COD' : 'PayPal')
  },
  {
    title: 'Payment Status',
    dataIndex: 'paymentStatus',
    render: (_, record) =>
      record.paymentStatus === Checkout.PAYMENT_STATUS_PAID ? <Tag color='geekblue'>Paid</Tag> : <Tag color='gold'>Pending</Tag>
  },
  {
    title: 'Shipping Status',
    dataIndex: 'shippingStatus',
    render: (_, record) =>
      record.shippingStatus === Checkout.SHIPPING_STATUS_SHIPPING ? (
        <Tag color='orange'>Shipping</Tag>
      ) : Checkout.SHIPPING_STATUS_DELIVERED ? (
        <Tag color='blue'>Delivered</Tag>
      ) : (
        <Tag color='volcano'>Cancel</Tag>
      )
  },
  {
    title: 'Totals',
    dataIndex: 'orderItems',
    render: (_, record) => convertPrice(record.orderItems.reduce((prev, next) => prev + next.price * next.quantity, 0))
  }
];

export const orderItemColumns: ColumnsType<IOrderItem> = [
  {
    title: 'Product Name',
    dataIndex: 'productName',
    align: 'center',
    render: (_, record) => (
      <Link to={`/${RouteBasePath.CLIENT_PRODUCT_PAGE_BASE_PATH}/${record.productCategoryDto.categorySlug}/${record.productId}`} target='_blank'>
        {record.productName}
      </Link>
    )
  },
  {
    title: 'Category',
    dataIndex: 'productCategoryDto.categoryName',
    align: 'center',
    render: (_, record) => (
      <Link to={`/${RouteBasePath.CLIENT_PRODUCT_PAGE_BASE_PATH}/${record.productCategoryDto.categorySlug}`} target='_blank'>
        {record.productCategoryDto.categoryName}
      </Link>
    )
  },
  {
    title: 'Net Weight',
    dataIndex: 'netWeightLabel',
    align: 'center'
  },
  {
    title: 'Price',
    dataIndex: 'price',
    align: 'center',
    render: (_, record) => convertPrice(record.price)
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    align: 'center'
  },
  {
    title: 'Totals',
    align: 'center',
    render: (_, record) => convertPrice(record.price * record.quantity)
  }
];

export const shippingInfoColumns: ColumnsType<IShippingInfo> = [
  {
    title: 'Receiver Name',
    dataIndex: 'receiverName',
    align: 'center'
  },
  {
    title: 'Receiver Phone',
    dataIndex: 'receiverPhone',
    align: 'center'
  },
  {
    title: 'Shipping Address',
    dataIndex: 'shippingAddress',
    align: 'center'
  }
];

export const paymentInfoColumns: ColumnsType<Omit<IPaymentInfo, 'paymentCaptureId'>> = [
  {
    title: 'Payment Id',
    dataIndex: 'paymentId',
    align: 'center'
  },
  {
    title: 'Payee Name',
    dataIndex: 'payeeName',
    align: 'center'
  },
  {
    title: 'Payee Email',
    dataIndex: 'payeeEmail',
    align: 'center'
  },
  {
    title: 'Payment Created',
    dataIndex: 'paymentCreated',
    align: 'center'
  }
];
