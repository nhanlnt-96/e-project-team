import { Spin } from 'antd';
import { SvgIcons } from 'assets/icons/svgIcons';
import { RouteBasePath } from 'constants/index';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getCurrentCartThunk } from 'redux/cartManage/getCurrentCartSlice';
import { getCurrentCartSelector } from 'redux/cartManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const HeaderCartButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, cartData } = useAppSelector(getCurrentCartSelector);

  useEffect(() => {
    if (!cartData) dispatch(getCurrentCartThunk());
  }, []);

  return (
    <NavLink
      to={`/${RouteBasePath.CLIENT_CART_PAGE_BASE_PATH}`}
      className='text-white flex justify-center items-center space-x-1.5 header-toolbar__item'
    >
      {React.cloneElement(SvgIcons.ShoppingCart, { className: 'w-6 h-6' })}
      {!isLoading ? <span>({cartData?.productsInCart?.length || '0'})</span> : <Spin size='small' />}
    </NavLink>
  );
};

export default HeaderCartButton;
