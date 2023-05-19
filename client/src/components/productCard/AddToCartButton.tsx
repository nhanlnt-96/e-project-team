import { SvgIcons } from 'assets/icons/svgIcons';
import Loading from 'components/loading';
import { FeatureButton } from 'components/productCard/CardHoverFeatures';
import { RouteBasePath } from 'constants/index';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthSelector } from 'redux/authenticate/selector';
import { addToCartThunk } from 'redux/cartManage/addToCartSlice';
import { addToCartSelector } from 'redux/cartManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IAddToCartData } from 'services/cart';
import { IProductData } from 'services/product';

interface IProps {
  productData: IProductData;
}

const AddToCartButton: React.FC<IProps> = ({ productData }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(getAuthSelector);
  const { isLoading } = useAppSelector(addToCartSelector);

  const handleAddToCart = useCallback(() => {
    if (userData) {
      const addToCartData: IAddToCartData = {
        productId: productData.productId,
        netWeightId: productData.productQuantityDtoList[0].netWeightDto?.netWeightId as number,
        quantity: 1
      };

      dispatch(addToCartThunk(addToCartData));
    } else {
      navigate(RouteBasePath.LOGIN_BASE_PATH, { state: { from: pathname } });
    }
  }, [productData, userData]);

  return !isLoading ? (
    <FeatureButton icon={React.cloneElement(SvgIcons.ShoppingCart, { className: 'w-8 h-8' })} label='Add to cart' onClick={handleAddToCart} />
  ) : (
    <Loading isLoadingMask />
  );
};

export default AddToCartButton;
