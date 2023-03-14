import './Sidebar.scss';

import { Layout } from 'antd';
import ButtonComp from 'components/buttonComp';
import Logo from 'components/logo';
import { sidebarData } from 'pages/adminPage/components/sidebar/configs';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className='!bg-white z-50' width={340}>
      <div className='w-full flex justify-between items-center py-2 px-3'>
        {!collapsed ? (
          <div className='w-full flex justify-center items-center space-x-2.5'>
            <Logo rootUrl='/admin' className='!text-black' />
            <p className='mt-auto text-lg font-medium'>AdminPage</p>
          </div>
        ) : (
          <></>
        )}
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
      <div className='space-y-6 flex flex-col p-4'>
        {sidebarData.map((item) => (
          <NavLink key={item.path} to={item.path} className='text-black w-fit after:bg-black nav-link__hover'>
            {!collapsed ? item.label : item.label.substring(0, 3)}
          </NavLink>
        ))}
      </div>
    </Sider>
  );
};

export default Sidebar;