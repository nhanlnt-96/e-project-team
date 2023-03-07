import {Drawer} from 'antd';
import HeaderLink from 'components/headerComp/HeaderLink';
import HeaderToolbar from 'components/headerComp/HeaderToolbar';
import Logo from 'components/logo';
import React, {useState} from 'react';

const HeaderDrawer: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div
            className='w-fit flex justify-center items-center border-none outline-none focus:ring-0 hover:text-link-hover xl:hidden'>
            <button onClick={showDrawer} className='text-white'>
                <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'
                     className='w-6 h-6'>
                    <path
                        clipRule='evenodd'
                        fillRule='evenodd'
                        d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75H12a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
                    ></path>
                </svg>
            </button>
            <Drawer
                closeIcon={
                    <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'
                         className='w-6 h-6'>
                        <path
                            clipRule='evenodd'
                            fillRule='evenodd'
                            d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                        ></path>
                    </svg>
                }
                title={<Logo className='!text-black'/>}
                placement='left'
                onClose={onClose}
                open={open}
                className='header-drawer__container'
            >
                <HeaderLink/>
                <HeaderToolbar/>
            </Drawer>
        </div>
    );
};

export default HeaderDrawer;