import DataTable from 'pages/adminPage/components/datatable';
import { columns } from 'pages/adminPage/productManage/configs';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllProductThunk } from 'redux/productManage/getAllProductSlice';
import { productDataSelector } from 'redux/productManage/selector';
import { IProductData } from 'services/product';

const ProductListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productData, isLoading } = useAppSelector(productDataSelector);

  useEffect(() => {
    if (!productData.length) dispatch(getAllProductThunk());
  }, [productData]);

  return <DataTable<IProductData> loading={isLoading} data={productData} columns={columns} />;
};

export default ProductListing;