import Loading from 'components/loading';
import Title from 'components/title';
import { useEffectOnce } from 'hooks/useEffectOnce';
import CartEmpty from 'pages/cartPage/cartSummaryPage/CartEmpty';
import CartTotal from 'pages/cartPage/cartSummaryPage/CartTotal';
import ProductListing from 'pages/cartPage/cartSummaryPage/ProductListing';
import React from 'react';
import { getCurrentCartThunk } from 'redux/cartManage/getCurrentCartSlice';
import { getCurrentCartSelector } from 'redux/cartManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const CartSummaryPage = () => {
  const dispatch = useAppDispatch();
  const { cartData, isLoading } = useAppSelector(getCurrentCartSelector);

  useEffectOnce(() => {
    if (!cartData) dispatch(getCurrentCartThunk());
  });

  return cartData?.productsInCart.length ? (
    <div className='w-full'>
      <Title title='YOUR SHOPPING BAG' titleClassName='text-black font-jost not-italic font-bold' />
      <CartTotal cartData={cartData} />
      <ProductListing productInCart={cartData.productsInCart} />
      <CartTotal cartData={cartData} />
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </div>
  ) : (
    <CartEmpty />
  );
};

export default CartSummaryPage;
