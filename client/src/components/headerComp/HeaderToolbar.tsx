import { SvgIcons } from 'assets/icons/svgIcons';
import HeaderAuthButton from 'components/headerComp/HeaderAuthButton';
import ProductFavoriteButton from 'components/headerComp/ProductFavoriteButton';
import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderToolbar: React.FC = () => {
  return (
    <div className='flex-1 flex justify-center items-center lg:justify-end lg:space-x-5 xl:space-x-10 header-toolbar'>
      <NavLink to='/cart' className='text-white flex justify-center items-center space-x-1.5 header-toolbar__item'>
        {React.cloneElement(SvgIcons.ShoppingCart, { className: 'w-6 h-6' })}
        <span>(0)</span>
      </NavLink>
      <ProductFavoriteButton />
      <HeaderAuthButton />
    </div>
  );
};

export default HeaderToolbar;
