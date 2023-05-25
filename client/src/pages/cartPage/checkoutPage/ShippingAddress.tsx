import InputComp from 'components/inputComp';
import { FormikProps } from 'formik';
import { handleDisplayErrorMsg } from 'helpers/formik';
import { ICheckoutFormikValues } from 'pages/cartPage/checkoutPage/useCheckoutFormik';
import React from 'react';

interface IProps {
  formik: FormikProps<ICheckoutFormikValues>;
}

const ShippingAddress: React.FC<IProps> = ({ formik }) => {
  return (
    <div className='form-control'>
      <div className='form-control__inline'>
        <div className='form-item form-item__required'>
          <label htmlFor='receiverName'>Receiver Name</label>
          <InputComp
            type='text'
            placeholder='Receiver Name'
            id='receiverName'
            name='receiverName'
            value={formik.values.receiverName}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<ICheckoutFormikValues>(formik, 'receiverName')}
        </div>
        <div className='form-item form-item__required'>
          <label htmlFor='receiverPhone'>Receiver Phone</label>
          <InputComp
            type='text'
            placeholder='Receiver Phone'
            id='receiverPhone'
            name='receiverPhone'
            value={formik.values.receiverPhone}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<ICheckoutFormikValues>(formik, 'receiverPhone')}
        </div>
      </div>
      <div className='form-item form-item__required'>
        <label htmlFor='receiverPhone'>Shipping Address</label>
        <InputComp
          type='text'
          placeholder='Shipping Address'
          id='shippingAddress'
          name='shippingAddress'
          value={formik.values.shippingAddress}
          onChange={formik.handleChange}
        />
        {handleDisplayErrorMsg<ICheckoutFormikValues>(formik, 'shippingAddress')}
      </div>
    </div>
  );
};

export default ShippingAddress;
