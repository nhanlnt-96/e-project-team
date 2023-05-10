import './MyAccount.scss';

import AccountInformation from 'pages/myAccountPage/myAccount/AccountInformation';
import LogoutButton from 'pages/myAccountPage/myAccount/LogoutButton';
import React from 'react';

const MyAccountPage = () => {
  return (
    <div className='w-full space-y-8'>
      <AccountInformation />
      <LogoutButton />
    </div>
  );
};

export default MyAccountPage;
