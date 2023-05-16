import Title from 'components/title';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { columns } from 'pages/adminPage/accountManagePage/configs';
import DataTable from 'pages/adminPage/components/datatable';
import React, { useMemo } from 'react';
import { getAllAccountThunk } from 'redux/accountManage/getAllAccountSlice';
import { getAllAccountSelector } from 'redux/accountManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IUserData } from 'services/authenticate';
import { addPropertyKeyToArray } from 'utils/addPropertyKeyToArray';

const AccountListingPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, accountData } = useAppSelector(getAllAccountSelector);

  const accountDataTable = useMemo(() => {
    return addPropertyKeyToArray<IUserData>(accountData, 'userId');
  }, [accountData]);

  useEffectOnce(() => {
    if (!accountData.length) dispatch(getAllAccountThunk());
  });

  return (
    <>
      <Title title={'Account listing'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
      <DataTable<IUserData> data={accountDataTable} columns={columns} loading={isLoading} />;
    </>
  );
};

export default AccountListingPage;
