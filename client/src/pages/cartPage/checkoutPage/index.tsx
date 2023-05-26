import './CheckoutPage.scss';

import { Collapse } from 'antd';
import ButtonComp from 'components/buttonComp';
import CollapseComp from 'components/collapseComp';
import Loading from 'components/loading';
import Title from 'components/title';
import { Checkout, RouteBasePath } from 'constants/index';
import CartEmpty from 'pages/cartPage/cartSummaryPage/CartEmpty';
import CartTotal from 'pages/cartPage/cartSummaryPage/CartTotal';
import ProductListing from 'pages/cartPage/cartSummaryPage/ProductListing';
import OrderSuccessModal from 'pages/cartPage/checkoutPage/OrderSuccessModal';
import PaymentMethod from 'pages/cartPage/checkoutPage/PaymentMethod';
import ShippingAddress from 'pages/cartPage/checkoutPage/ShippingAddress';
import { ICheckoutFormikValues, useCheckoutFormik } from 'pages/cartPage/checkoutPage/useCheckoutFormik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrentCartThunk } from 'redux/cartManage/getCurrentCartSlice';
import { getCurrentCartSelector } from 'redux/cartManage/selector';
import { getOrderThunk } from 'redux/checkoutManage/getOrderSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { createOrderService, ICreatedOrderData } from 'services/checkout';

const { Panel } = Collapse;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartData, isLoading } = useAppSelector(getCurrentCartSelector);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

  const handleCreateOrder = async (values: ICheckoutFormikValues) => {
    setIsPlacingOrder(true);

    const orderData: ICreatedOrderData = {
      receiverName: values.receiverName,
      receiverPhone: values.receiverPhone,
      paymentMethod: values.paymentMethod,
      shippingAddress: values.shippingAddress
    };
    if (values.paymentInfo) orderData.paymentInfo = values.paymentInfo;
    try {
      const response = await createOrderService(orderData);
      if (response) {
        setIsOpenModal(true);
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const formik = useCheckoutFormik(handleCreateOrder);

  const handleCloseModal = () => {
    setIsOpenModal(false);

    dispatch(getCurrentCartThunk());

    dispatch(getOrderThunk());

    navigate(RouteBasePath.CLIENT_HOME_PAGE_BASE_PATH);
  };

  return cartData?.productsInCart.length ? (
    <>
      <div className='w-full space-y-4 checkout-page'>
        <Title title='CHECKOUT' titleClassName='text-black font-jost not-italic font-bold' />
        <form onSubmit={formik.handleSubmit}>
          <CollapseComp defaultActiveKey={['1', '2', '3']}>
            <Panel key='1' header='Delivery Address'>
              <ShippingAddress formik={formik} />
            </Panel>
            <Panel key='2' header='Order Summary'>
              <ProductListing productInCart={cartData.productsInCart} />
              <CartTotal cartData={cartData} isShowCheckoutButton={false} />
            </Panel>
            <Panel key='3' header='SELECT PAYMENT'>
              <PaymentMethod formik={formik} cartData={cartData} />
            </Panel>
          </CollapseComp>
          <ButtonComp
            htmlType='submit'
            disabled={formik.values.paymentMethod === Checkout.PAYMENT_METHOD_PAYPAL && !formik.values.paymentInfo}
            isPrimary={false}
            className='mx-auto mt-6'
          >
            Order now
          </ButtonComp>
        </form>
        <Link to='..' className='block text-center underline hover:text-link-hover'>
          Back
        </Link>
        {isLoading || isPlacingOrder ? <Loading isLoadingMask /> : <></>}
      </div>
      <OrderSuccessModal isOpen={isOpenModal} onClose={handleCloseModal} receiverName={formik.values.receiverName} />
    </>
  ) : (
    <CartEmpty />
  );
};

export default CheckoutPage;
