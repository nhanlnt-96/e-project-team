import { headerLinks } from 'components/headerComp/configs';
import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderLink: React.FC = () => {
  return (
    <div className='flex-1 lg:space-x-5 xl:space-x-10 header-link'>
      {headerLinks.map((link) => (
        <NavLink key={link.path} to={link.path} className='hover:text-white header-link__item'>
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default HeaderLink;
