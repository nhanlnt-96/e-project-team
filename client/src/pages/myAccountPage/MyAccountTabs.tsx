import { Tabs } from 'antd';
import { myAccountTabsItems } from 'pages/myAccountPage/configs';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MyAccountTabs: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onChange = (key: string) => {
    navigate(key);
  };

  return <Tabs activeKey={pathname} items={myAccountTabsItems} onChange={onChange} className='my-account-layout__tabs' />;
};

export default MyAccountTabs;
