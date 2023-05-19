import HeaderAuthButton from 'components/headerComp/headerToolbar/HeaderAuthButton';
import HeaderCartButton from 'components/headerComp/headerToolbar/HeaderCartButton';
import ProductFavoriteButton from 'components/headerComp/headerToolbar/ProductFavoriteButton';
import React from 'react';

const HeaderToolbar: React.FC = () => {
  return (
    <div className='flex-1 flex justify-center items-center lg:justify-end lg:space-x-5 xl:space-x-10 header-toolbar'>
      <HeaderCartButton />
      <ProductFavoriteButton />
      <HeaderAuthButton />
    </div>
  );
};

export default HeaderToolbar;
