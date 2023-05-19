import { Spin } from 'antd';
import { SvgIcons } from 'assets/icons/svgIcons';
import { RouteBasePath } from 'constants/index';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAuthSelector } from 'redux/authenticate/selector';
import { useAppSelector } from 'redux/hooks';

const AccountIcon = () => {
  return React.cloneElement(SvgIcons.Account, { className: 'w-6 h-6' });
};

const HeaderAuthButton: React.FC = () => {
  const { isLoading, userData } = useAppSelector(getAuthSelector);

  return userData ? (
    <NavLink to={RouteBasePath.MY_ACCOUNT_PAGE_BASE_PATH} className='text-white flex justify-center items-center space-x-1.5 header-toolbar__item' end>
      <AccountIcon />
      {!isLoading ? <span>Hi, {userData.fullName}</span> : <Spin size='small' />}
    </NavLink>
  ) : (
    <NavLink to={RouteBasePath.LOGIN_BASE_PATH} className='text-white flex justify-center items-center space-x-1.5 header-toolbar__item' end>
      <AccountIcon />
      <span>Login</span>
    </NavLink>
  );
};

export default HeaderAuthButton;
