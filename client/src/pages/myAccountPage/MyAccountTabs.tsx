import { Tabs } from 'antd';
import { myAccountTabsItems } from 'pages/myAccountPage/configs';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const MyAccountTabs: React.FC = () => {
  const navigate = useNavigate();

  const onChange = useCallback(
    (key: string) => {
      const path = myAccountTabsItems.find((item) => item.key === key)?.path;

      navigate(path as string);
    },
    [myAccountTabsItems]
  );

  return <Tabs defaultActiveKey={myAccountTabsItems[0].key} items={myAccountTabsItems} onChange={onChange} className='my-account-layout__tabs' />;
};

export default MyAccountTabs;
