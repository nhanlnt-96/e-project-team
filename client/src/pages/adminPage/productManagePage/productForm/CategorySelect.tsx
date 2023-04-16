import SelectComp, { ISelectCompProps } from 'components/selectComp';
import React, { useEffect, useMemo } from 'react';
import { getAllCategoryThunk } from 'redux/categoryManage/getAllCategorySlice';
import { categoryDataSelector } from 'redux/categoryManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

interface IProps extends ISelectCompProps {}

const CategorySelect: React.FC<IProps> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const { isLoading, categoryData } = useAppSelector(categoryDataSelector);

  const categorySelectData = useMemo(() => {
    const categoryDefaultData = [
      {
        value: 0,
        label: 'Select Category'
      }
    ];

    for (const category of categoryData) {
      categoryDefaultData.push({
        value: category.categoryId,
        label: category.categoryName
      });
    }

    return categoryDefaultData;
  }, [categoryData]);

  useEffect(() => {
    if (!categoryData.length) {
      dispatch(getAllCategoryThunk());
    }
  }, [categoryData]);

  return <SelectComp {...props} loading={isLoading} options={categorySelectData} />;
};

export default CategorySelect;
