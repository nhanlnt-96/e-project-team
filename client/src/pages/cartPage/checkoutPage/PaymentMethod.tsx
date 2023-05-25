import CODIcon from 'assets/icons/cod-icon.png';
import PayPalIcon from 'assets/icons/paypal-icon.png';
import ImageResponsive from 'components/imageResponsive';
import PayPalButton from 'components/payPalButton';
import { Checkout } from 'constants/index';
import { FormikProps } from 'formik';
import _ from 'lodash';
import { ICheckoutFormikValues } from 'pages/cartPage/checkoutPage/useCheckoutFormik';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { ICartData } from 'services/cart';
import { IPaymentInfo } from 'services/checkout';

interface IProps {
  formik: FormikProps<ICheckoutFormikValues>;
  cartData: ICartData;
}

const PaymentMethod: React.FC<IProps> = ({ formik, cartData }) => {
  const [approvePayPalSuccess, setApprovePayPalSuccess] = useState<any>(null);

  const totalPrice = useMemo(() => {
    return cartData?.productsInCart.length
      ? cartData.productsInCart.reduce((prev, next) => prev + next.quantity * next.productQuantityDto.price, 0)
      : 0;
  }, [cartData]);

  const orderDescription = useMemo(() => {
    return `Payment for receiver name ${formik.values.receiverName}`;
  }, [formik.values.receiverName]);
  const handleCheckPaymentMethod = (method: number) => formik.setFieldValue('paymentMethod', method);

  useEffect(() => {
    if (approvePayPalSuccess) {
      toast.success('Your order is paid. Click Order Now to create your order');

      const paymentInfo: IPaymentInfo = {
        paymentId: _.get(approvePayPalSuccess, 'id', ''),
        paymentCreated: _.get(approvePayPalSuccess, 'create_time', ''),
        payeeName: _.get(approvePayPalSuccess?.purchase_units?.[0]?.shipping?.name, 'full_name', ''),
        payeeEmail: _.get(approvePayPalSuccess?.purchase_units?.[0]?.payee, 'email_address', ''),
        paymentCaptureId: _.get(approvePayPalSuccess?.purchase_units?.[0]?.payments?.captures?.[0], 'id', '')
      };

      formik.setFieldValue('paymentInfo', paymentInfo);
    }
  }, [approvePayPalSuccess]);

  return (
    <div className='checkout-page__payment-method'>
      <label htmlFor='cod' className='checkout-page__payment-method__radio' onClick={() => handleCheckPaymentMethod(Checkout.PAYMENT_METHOD_COD)}>
        <input type='radio' id='code' name='payment-method' readOnly checked={formik.values.paymentMethod === Checkout.PAYMENT_METHOD_COD} />
        <span className='title'>COD</span>
        <span className='subtitle'>Cash on delivery</span>
        <div className='icon'>
          <ImageResponsive width={78} height={78} imageProps={{ src: CODIcon, alt: 'cod-payment-method' }} />
        </div>
      </label>
      <div className='w-full max-w-[400px] space-y-4'>
        <label
          htmlFor='cod'
          className='checkout-page__payment-method__radio'
          onClick={() => handleCheckPaymentMethod(Checkout.PAYMENT_METHOD_PAYPAL)}
        >
          <input type='radio' id='code' name='payment-method' readOnly checked={formik.values.paymentMethod === Checkout.PAYMENT_METHOD_PAYPAL} />
          <span className='title'>Paypal</span>
          <span className='subtitle'>Pay easily with your Paypal account</span>
          <div className='icon'>
            <ImageResponsive width={78} height={78} imageProps={{ src: PayPalIcon, alt: 'paypal-payment-method' }} />
          </div>
        </label>
        {formik.values.paymentMethod === Checkout.PAYMENT_METHOD_PAYPAL ? (
          <PayPalButton
            description={orderDescription}
            amount={totalPrice}
            setApprovePayPalSuccess={setApprovePayPalSuccess}
            className='paypal-payment-button'
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
