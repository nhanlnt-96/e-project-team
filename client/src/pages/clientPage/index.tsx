import HeaderComponent from 'components/headerComp';
import React from 'react';
import {Outlet} from 'react-router-dom';

const ClientPage = () => {
    return (
        <div className='w-full overflow-y-auto'>
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
};

export default ClientPage;