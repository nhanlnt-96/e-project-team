import { useEffectOnce } from 'hooks/useEffectOnce';
import { columns } from 'pages/adminPage/accountManagePage/configs';
import DataTable from 'pages/adminPage/components/datatable';
import React, { useMemo } from 'react';
import { getAllAccountThunk } from 'redux/accountManage/getAllAccountSlice';
import { getAllAccountSelector } from 'redux/accountManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IUserData } from 'services/authenticate';
import { addPropertyKeyToArray } from 'utils/addPropertyKeyToArray';

const AccountListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, accountData } = useAppSelector(getAllAccountSelector);

  const accountDataTable = useMemo(() => {
    return addPropertyKeyToArray<IUserData>(accountData, 'netWeightValue');
  }, [accountData]);

  useEffectOnce(() => {
    if (!accountData.length) dispatch(getAllAccountThunk());
  });

  return <DataTable<IUserData> data={accountDataTable} columns={columns} loading={isLoading} />;
};

export default AccountListing;
