import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import { AllowNumber } from 'constants/index';
import { handleCheckErrorStatus, handleDisplayErrorMsg } from 'helpers/formik';
import useNetWeightFormik, { INetWeightFormikValue } from 'pages/adminPage/netWeightManage/netWeightForm/useNetWeightFormik';
import React from 'react';
import { INetWeightData } from 'services/netWeight';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: INetWeightFormikValue) => void;
  netWeightData?: INetWeightData;
  isLoading?: boolean;
}

const NetWeightForm: React.FC<IProps> = ({ onSubmit, netWeightData, isLoading = false }) => {
  const formik = useNetWeightFormik(onSubmit, netWeightData);

  return (
    <form onSubmit={formik.handleSubmit} className='w-full space-y-4'>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryName'>Net Weight Label</label>
        <InputComp
          type='text'
          status={handleCheckErrorStatus<INetWeightFormikValue>(formik, 'netWeightLabel')}
          placeholder='Net Weight Label'
          name='netWeightLabel'
          id='netWeightLabel'
          disabled={isLoading}
          value={formik.values.netWeightLabel}
          onChange={formik.handleChange}
        />
        {handleDisplayErrorMsg<INetWeightFormikValue>(formik, 'netWeightLabel')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryName'>
          Net Weight Value <span className='font-bold'>(At least {AllowNumber.MIN_NET_WEIGHT_VALUE}g)</span>
        </label>
        <InputComp
          type='number'
          status={handleCheckErrorStatus<INetWeightFormikValue>(formik, 'netWeightValue')}
          placeholder='NenetWeightValue'
          name='netWeightValue'
          id='netWeightValue'
          disabled={isLoading}
          value={formik.values.netWeightValue}
          onChange={formik.handleChange}
        />
        {handleDisplayErrorMsg<INetWeightFormikValue>(formik, 'netWeightValue')}
      </div>
      <ButtonComp loading={isLoading} isPrimary={false} htmlType='submit' className='ml-auto'>
        Ok
      </ButtonComp>
    </form>
  );
};

export default NetWeightForm;
