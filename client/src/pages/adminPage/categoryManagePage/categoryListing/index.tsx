import { useEffectOnce } from 'hooks/useEffectOnce';
import { columns } from 'pages/adminPage/categoryManagePage/configs';
import Datatable from 'pages/adminPage/components/datatable';
import React, { useMemo } from 'react';
import { getAllCategoryThunk } from 'redux/categoryManage/getAllCategorySlice';
import { categoryDataSelector } from 'redux/categoryManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ICategoryData } from 'services/category';
import { addPropertyKeyToArray } from 'utils/addPropertyKeyToArray';

const CategoryListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryData, isLoading } = useAppSelector(categoryDataSelector);

  const categoryDataTable = useMemo(() => {
    return addPropertyKeyToArray<ICategoryData>(categoryData, 'categoryId');
  }, [categoryData]);

  useEffectOnce(() => {
    if (!categoryData.length) dispatch(getAllCategoryThunk());
  });

  return <Datatable<ICategoryData> loading={isLoading} data={categoryDataTable} columns={columns} />;
};

export default CategoryListing;
