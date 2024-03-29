import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import Loading from 'components/loading';
import { FeatureButton } from 'components/productCard/CardHoverFeatures';
import { Roles, RouteBasePath } from 'constants/index';
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuthSelector } from 'redux/authenticate/selector';
import { addToCartThunk } from 'redux/cartManage/addToCartSlice';
import { addToCartSelector, getCurrentCartSelector } from 'redux/cartManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IAddToCartData } from 'services/cart';
import { IProductData } from 'services/product';

interface IProps {
  productData: IProductData;
  isButton?: boolean;
  quantity?: number;
}

const AddToCartButton: React.FC<IProps> = ({ productData, isButton = false, quantity }) => {
  const DEFAULT_QUANTITY_ADD_TO_CART = 1;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(getAuthSelector);
  const { isLoading } = useAppSelector(addToCartSelector);
  const { cartData } = useAppSelector(getCurrentCartSelector);

  const handleAddToCart = useCallback(() => {
    if (userData) {
      const productExistInCart = cartData?.productsInCart.find((product) => product.productId === productData.productId);

      const addToCartData: IAddToCartData = {
        productId: productData.productId,
        netWeightId: productData.productQuantityDtoList[0].netWeightDto?.netWeightId as number,
        quantity: quantity
          ? quantity
          : !productExistInCart
          ? DEFAULT_QUANTITY_ADD_TO_CART
          : productExistInCart.quantity + DEFAULT_QUANTITY_ADD_TO_CART
      };

      dispatch(addToCartThunk(addToCartData));
    } else {
      navigate(RouteBasePath.LOGIN_BASE_PATH, { state: { from: pathname } });
    }
  }, [productData, userData, cartData, quantity]);

  return !isLoading ? (
    !userData || userData?.role.includes(Roles.USER_ROLE) ? (
      !isButton ? (
        <FeatureButton icon={React.cloneElement(SvgIcons.ShoppingCart, { className: 'w-8 h-8' })} label='Add to cart' onClick={handleAddToCart} />
      ) : (
        <ButtonComp className='mx-auto' onClick={handleAddToCart}>
          Add to Cart
        </ButtonComp>
      )
    ) : (
      <></>
    )
  ) : (
    <Loading isLoadingMask />
  );
};

export default AddToCartButton;
