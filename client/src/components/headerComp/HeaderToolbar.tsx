import {headerToolbar} from 'components/headerComp/configs';
import React from 'react';
import {NavLink} from 'react-router-dom';

const HeaderToolbar: React.FC = () => {
    return (
        <div className='flex-1 flex justify-center items-center lg:justify-end lg:space-x-5 xl:space-x-10 header-toolbar'>
            <NavLink to='/cart'
                     className='text-white flex justify-center items-center space-x-1.5 header-toolbar__item'>
                <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'
                     className='w-6 h-6'>
                    <path
                        d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z'></path>
                </svg>
                <span>(0)</span>
            </NavLink>
            {headerToolbar.map((toolbar) => (
                <NavLink key={toolbar.path} to={toolbar.path}
                         className='text-white flex justify-center items-center space-x-1.5 header-toolbar__item'>
                    {toolbar.icon}
                    <span>{toolbar.label}</span>
                </NavLink>
            ))}
        </div>
    );
};

export default HeaderToolbar;