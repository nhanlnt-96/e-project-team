import { columns } from 'pages/adminPage/categoryManage/configs';
import Datatable from 'pages/adminPage/components/datatable';
import React, { useEffect, useMemo } from 'react';
import { getAllCategoryThunk } from 'redux/categoryManage/getAllCategorySlice';
import { categoryDataSelector } from 'redux/categoryManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ICategoryData } from 'services/category';
import { addPropertyKeyToArray } from 'utils/addPropertyKeyToArray';

const CategoryListing = () => {
  const dispatch = useAppDispatch();
  const { categoryData, isLoading } = useAppSelector(categoryDataSelector);

  const categoryDataTable = useMemo(() => {
    return addPropertyKeyToArray<ICategoryData>(categoryData, 'categoryId');
  }, [categoryData]);

  useEffect(() => {
    if (!categoryData.length) dispatch(getAllCategoryThunk());
  }, [categoryData]);

  return <Datatable<ICategoryData> loading={isLoading} data={categoryDataTable} columns={columns} />;
};

export default CategoryListing;