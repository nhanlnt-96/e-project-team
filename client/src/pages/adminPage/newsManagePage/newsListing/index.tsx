import DataTable from 'components/datatable';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { columns } from 'pages/adminPage/newsManagePage/configs';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllNewsThunk } from 'redux/newsManage/getAllNewsSlice';
import { getAllNewsSelector } from 'redux/newsManage/selector';
import { INewsData } from 'services/news';

const NewsListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, allNewsData } = useAppSelector(getAllNewsSelector);

  useEffectOnce(() => {
    if (!allNewsData.length) dispatch(getAllNewsThunk());
  });

  return <DataTable<INewsData> data={allNewsData} columns={columns} loading={isLoading} />;
};

export default NewsListing;
