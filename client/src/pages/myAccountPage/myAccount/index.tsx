import './MyAccount.scss';

import AccountInformation from 'pages/myAccountPage/myAccount/AccountInformation';
import ChangePasswordSection from 'pages/myAccountPage/myAccount/ChangePasswordSection';
import LogoutButton from 'pages/myAccountPage/myAccount/LogoutButton';
import React from 'react';

const MyAccountPage = () => {
  return (
    <div className='w-full space-y-8'>
      <AccountInformation />
      <ChangePasswordSection />
      <LogoutButton />
    </div>
  );
};

export default MyAccountPage;
