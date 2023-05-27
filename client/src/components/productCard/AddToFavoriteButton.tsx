import { SvgIcons } from 'assets/icons/svgIcons';
import Loading from 'components/loading';
import { FeatureButton } from 'components/productCard/CardHoverFeatures';
import { Roles, RouteBasePath } from 'constants/index';
import React, { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthSelector } from 'redux/authenticate/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addProductFavoriteThunk } from 'redux/productFavorite/addProductFavoriteSlice';
import { removeProductFavoriteThunk } from 'redux/productFavorite/removeProductFavoriteSlice';
import { addProductFavoriteSelector, getProductFavoriteSelector, removeProductFavoriteSelector } from 'redux/productFavorite/selector';

interface IProps {
  productId: number;
  variant?: 'icon' | 'text';
}

const AddToFavoriteButton: React.FC<IProps> = ({ productId, variant = 'icon' }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(getAuthSelector);
  const { isLoading: isAddingProductFavorite } = useAppSelector(addProductFavoriteSelector);
  const { isLoading: isRemovingProductFavorite } = useAppSelector(removeProductFavoriteSelector);
  const { productFavoriteData } = useAppSelector(getProductFavoriteSelector);

  const findProductInList = useMemo(() => {
    return productFavoriteData.find((product) => product.productId === productId);
  }, [productFavoriteData]);

  const handleToggleProductFavorite = useCallback(() => {
    if (userData) {
      if (!findProductInList) {
        dispatch(addProductFavoriteThunk(productId));
      } else {
        if (variant === 'icon') dispatch(removeProductFavoriteThunk(productId));
      }
    } else {
      navigate(RouteBasePath.LOGIN_BASE_PATH, { state: { from: pathname } });
    }
  }, [productId, findProductInList, userData, variant]);

  return !userData || userData?.role === Roles.USER_ROLE ? (
    <>
      {variant === 'icon' ? (
        <FeatureButton
          disabled={isAddingProductFavorite || isRemovingProductFavorite}
          onClick={handleToggleProductFavorite}
          icon={React.cloneElement(SvgIcons.Heart, { className: 'w-8 h-8' })}
          label={findProductInList ? 'Added' : 'Add to favorite'}
        />
      ) : (
        <button
          type='button'
          disabled={Boolean(findProductInList)}
          className='underline uppercase tracking-widest w-fit text-secondary hover:text-link-hover'
          onClick={handleToggleProductFavorite}
        >
          {findProductInList ? 'Added to favorites' : 'Add to favorites'}
        </button>
      )}
      {isAddingProductFavorite || isRemovingProductFavorite ? <Loading isLoadingMask /> : <></>}
    </>
  ) : (
    <></>
  );
};

export default AddToFavoriteButton;
