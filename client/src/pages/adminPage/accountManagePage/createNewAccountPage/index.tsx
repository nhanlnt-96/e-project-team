import Loading from 'components/loading';
import Title from 'components/title';
import AccountInfoForm from 'pages/adminPage/accountManagePage/accountInfoForm';
import { IAccountInFoValues } from 'pages/adminPage/accountManagePage/accountInfoForm/useAccountInfoFormik';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllAccountThunk } from 'redux/accountManage/getAllAccountSlice';
import { useAppDispatch } from 'redux/hooks';
import { createNewAccountService, ICreateNewAccountData } from 'services/accountManage';

const CreateNewAccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreateNewAccount = async (values: IAccountInFoValues) => {
    setIsLoading(true);
    try {
      const accountData: ICreateNewAccountData = {
        roleName: values.roleName as string,
        dob: values.dob,
        password: values.password,
        gender: values.gender as number,
        email: values.email,
        phoneNumber: values.phoneNumber,
        addressDetail: values.addressDetail,
        fullName: values.fullName
      };
      const response = await createNewAccountService(accountData);
      if (response) {
        toast.success(`Created account with email: ${accountData.email}`);

        dispatch(getAllAccountThunk());

        navigate('..');
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SectionContainer>
        <Title title={'Create new account'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
        <AccountInfoForm onFormSubmit={handleCreateNewAccount} />
      </SectionContainer>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default CreateNewAccountPage;
