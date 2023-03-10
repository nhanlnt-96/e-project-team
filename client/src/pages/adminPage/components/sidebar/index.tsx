import './Sidebar.scss';

import { Layout, Menu } from 'antd';
import ButtonComp from 'components/buttonComp';
import Logo from 'components/logo';
import { sidebarData } from 'pages/adminPage/components/sidebar/configs';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className='!bg-white' width={340}>
      <div className='w-full flex justify-between items-center py-2 px-3'>
        {!collapsed ? <Logo rootUrl='/admin' className='!text-black' /> : <></>}
        <ButtonComp isPrimary={false} className={`!px-2 ${collapsed ? 'mx-auto' : ''}`} onClick={() => setCollapsed(!collapsed)}>
          <svg
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            className={`w-6 h-6 transition duration-200 ease-in-out ${collapsed ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5'></path>
          </svg>
        </ButtonComp>
      </div>
      <Menu mode='inline' className='space-y-4 sidebar-menu'>
        {sidebarData.map((item) => (
          <Menu.Item title='' key={item.path} className={`flex items-center ${collapsed ? 'text-center' : 'text-left'}`}>
            <NavLink to={item.path} className='after:bg-black nav-link__hover'>
              {!collapsed ? item.label : item.label.substring(0, 1)}
            </NavLink>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;