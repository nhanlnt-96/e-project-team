import SelectComp, { ISelectCompProps } from 'components/selectComp';
import { useEffectOnce } from 'hooks/useEffectOnce';
import React, { useMemo } from 'react';
import { getAllCategoryThunk } from 'redux/categoryManage/getAllCategorySlice';
import { categoryDataSelector } from 'redux/categoryManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

interface IProps extends ISelectCompProps {}

interface ICategorySelect {
  value: number;
  label: string;
  disabled?: boolean;
}

const CategorySelect: React.FC<IProps> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const { isLoading, categoryData } = useAppSelector(categoryDataSelector);

  const categorySelectData = useMemo(() => {
    const categoryDefaultData: ICategorySelect[] = [
      {
        value: 0,
        label: 'Select Category',
        disabled: true
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

  useEffectOnce(() => {
    if (!categoryData.length) {
      dispatch(getAllCategoryThunk());
    }
  });

  return <SelectComp {...props} loading={isLoading} options={categorySelectData} />;
};

export default CategorySelect;
