import { Checkout, FULL_NAME_REGEX, PHONE_NUMBER_REGEX } from 'constants/index';
import { useFormik } from 'formik';
import _ from 'lodash';
import { getAuthSelector } from 'redux/authenticate/selector';
import { useAppSelector } from 'redux/hooks';
import { IPaymentInfo } from 'services/checkout';
import * as Yup from 'yup';

export interface ICheckoutFormikValues {
  receiverName: string;
  receiverPhone: string;
  shippingAddress: string;
  paymentMethod: number;
  paymentInfo?: IPaymentInfo | null;
}

// eslint-disable-next-line no-unused-vars
export const useCheckoutFormik = (onSubmit: (values: ICheckoutFormikValues) => void) => {
  const { userData } = useAppSelector(getAuthSelector);

  const initialValues: ICheckoutFormikValues = {
    receiverName: _.get(userData, 'fullName', ''),
    receiverPhone: _.get(userData, 'phoneNumber', ''),
    shippingAddress: _.get(userData, 'addressDetail', ''),
    paymentMethod: Checkout.PAYMENT_METHOD_COD,
    paymentInfo: null
  };

  return useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      receiverName: Yup.string()
        .trim()
        .required('Please enter your full name')
        .matches(
          FULL_NAME_REGEX,
          'Full name must have: at least 2 words; no number; no special character; uppercase at beginning; lowercase for the rest; space between two words; no space at the begin and the end. Please try again'
        ),
      receiverPhone: Yup.string().trim().required('Please enter phone number').matches(PHONE_NUMBER_REGEX, 'Phone number invalid. Please try again'),
      shippingAddress: Yup.string().trim().required('Please enter shipping address')
    }),
    onSubmit: (values) => onSubmit(values)
  });
};
