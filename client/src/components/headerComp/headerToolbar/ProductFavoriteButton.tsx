import { Spin } from 'antd';
import { SvgIcons } from 'assets/icons/svgIcons';
import { RouteBasePath } from 'constants/index';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuthSelector } from 'redux/authenticate/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProductFavoriteThunk } from 'redux/productFavorite/getProductFavoriteSlice';
import { getProductFavoriteSelector } from 'redux/productFavorite/selector';

const ProductFavoriteButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(getAuthSelector);
  const { isLoading, productFavoriteData } = useAppSelector(getProductFavoriteSelector);

  useEffect(() => {
    if (userData && !productFavoriteData.length) dispatch(getProductFavoriteThunk());
  }, [userData, productFavoriteData.length]);

  return (
    <NavLink
      to={`${RouteBasePath.MY_ACCOUNT_PAGE_BASE_PATH}/${RouteBasePath.MY_FAVORITES_PAGE_BASE_PATH}`}
      className='text-white flex justify-center items-center space-x-1.5 header-toolbar__item' end
    >
      {React.cloneElement(SvgIcons.Heart, { className: 'w-6 h-6' })}
      <span>{!isLoading ? `(${productFavoriteData.length})` : <Spin size='small' />}</span>
    </NavLink>
  );
};

export default ProductFavoriteButton;
