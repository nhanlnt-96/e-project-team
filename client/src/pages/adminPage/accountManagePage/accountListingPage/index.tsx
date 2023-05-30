import DataTable from 'components/datatable';
import Title from 'components/title';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { columns } from 'pages/adminPage/accountManagePage/configs';
import CreateNewAccButton from 'pages/adminPage/accountManagePage/createNewAccountPage/CreateNewAccButton';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
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
    <SectionContainer>
      <Title title={'Account listing'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
      <div className='w-ful flex justify-end items-center'>
        <CreateNewAccButton />
      </div>
      <DataTable<IUserData> data={accountDataTable} columns={columns} loading={isLoading} />
    </SectionContainer>
  );
};

export default AccountListingPage;
