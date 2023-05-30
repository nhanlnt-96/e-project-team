import AccountInfoForm from 'pages/adminPage/accountManagePage/accountInfoForm';
import React from 'react';
import { IUserData } from 'services/authenticate';

interface IProps {
  userData: IUserData;
}

const AccountInformation: React.FC<IProps> = ({ userData }) => {
  return <AccountInfoForm userData={userData} />;
};

export default AccountInformation;
