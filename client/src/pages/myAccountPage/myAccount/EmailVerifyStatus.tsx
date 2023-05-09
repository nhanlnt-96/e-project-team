import React from 'react';
import { getAuthSelector } from 'redux/authenticate/selector';
import { useAppSelector } from 'redux/hooks';

const EmailVerifyStatus: React.FC = () => {
  const { userData } = useAppSelector(getAuthSelector);

  return userData?.verifyEmail ? <p className='text-green text-sm'>Email is verified</p> : <button className='text-antd-status-warning text-sm'>Click here to verify your email.</button>;
};

export default EmailVerifyStatus;
