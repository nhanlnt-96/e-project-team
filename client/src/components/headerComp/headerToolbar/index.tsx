import { SvgIcons } from 'assets/icons/svgIcons';
import HeaderAuthButton from 'components/headerComp/headerToolbar/HeaderAuthButton';
import HeaderCartButton from 'components/headerComp/headerToolbar/HeaderCartButton';
import ProductFavoriteButton from 'components/headerComp/headerToolbar/ProductFavoriteButton';
import { Roles, RouteBasePath } from 'constants/index';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { getAuthSelector } from 'redux/authenticate/selector';
import { useAppSelector } from 'redux/hooks';

const HeaderToolbar: React.FC = () => {
  const { userData } = useAppSelector(getAuthSelector);

  return (
    <div className='flex-1 justify-center items-center hidden lg:flex lg:justify-end lg:space-x-5 xl:space-x-10 header-toolbar'>
      <NavLink
        to={RouteBasePath.CLIENT_SEARCH_PAGE_BASE_PATH}
        className='text-white flex justify-center items-center space-x-1.5 header-toolbar__item'
      >
        {React.cloneElement(SvgIcons.MagnifyingGlass, { className: 'w-6 h-6' })}
      </NavLink>
      {!userData || userData?.role.includes(Roles.USER_ROLE) ? (
        <>
          <HeaderCartButton />
          <ProductFavoriteButton />
        </>
      ) : (
        <></>
      )}
      <HeaderAuthButton />
    </div>
  );
};

export default HeaderToolbar;
