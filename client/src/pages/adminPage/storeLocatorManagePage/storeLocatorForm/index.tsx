import ButtonComp from 'components/buttonComp';
import ImageUpload from 'components/imageUpload';
import ImagePreview from 'components/imageUpload/ImagePreview';
import InputComp from 'components/inputComp';
import { handleCheckErrorStatus, handleDisplayErrorMsg } from 'helpers/formik';
import StoreOpenHourInput from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm/storeOpenHourInput';
import useStoreLocatorFormik, { IStoreLocatorFormikValues } from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm/useStoreLocatorFormik';
import React from 'react';
import { IStoreLocatorData } from 'services/storeLocatorManage/types';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  storeData?: IStoreLocatorData;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: IStoreLocatorFormikValues) => void;
  isLoading: boolean;
}

const StoreLocatorForm: React.FC<IProps> = ({ storeData, onSubmit, isLoading }) => {
  const formik = useStoreLocatorFormik(onSubmit, storeData);

  return (
    <form onSubmit={formik.handleSubmit} className='w-full max-w-5xl mx-auto space-y-4'>
      <div className='w-full flex space-x-4'>
        <div className='w-full space-y-2'>
          <label htmlFor='storeName'>Store Name</label>
          <InputComp
            type='text'
            status={handleCheckErrorStatus<IStoreLocatorFormikValues>(formik, 'storeName')}
            placeholder='Store name'
            name='storeName'
            id='storeName'
            value={formik.values.storeName}
            onChange={formik.handleChange}
            disabled={isLoading}
          />
          {handleDisplayErrorMsg<IStoreLocatorFormikValues>(formik, 'storeName')}
        </div>
        <div className='w-full space-y-2'>
          <label htmlFor='storeName'>Store Phone Number</label>
          <InputComp
            type='text'
            status={handleCheckErrorStatus<IStoreLocatorFormikValues>(formik, 'phoneNumber')}
            placeholder='Store Phone Number'
            name='phoneNumber'
            id='phoneNumber'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            disabled={isLoading}
          />
          {handleDisplayErrorMsg<IStoreLocatorFormikValues>(formik, 'phoneNumber')}
        </div>
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='storeName'>Store Address</label>
        <InputComp
          type='text'
          status={handleCheckErrorStatus<IStoreLocatorFormikValues>(formik, 'address')}
          placeholder='Store Address'
          name='address'
          id='address'
          value={formik.values.address}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
        {handleDisplayErrorMsg<IStoreLocatorFormikValues>(formik, 'address')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='storeName'>Store Open Hours</label>
        <StoreOpenHourInput formik={formik} storeData={storeData} />
        {handleDisplayErrorMsg<IStoreLocatorFormikValues>(formik, 'storeOpenHours')}
      </div>
      {storeData?.storeImage ? (
        <div className='w-full space-y-2'>
          <label>Store Image Uploaded</label>
          <ImagePreview uri={imageLinkGeneration(storeData.storeImage, '')} />
        </div>
      ) : (
        <></>
      )}
      <div className='w-full space-y-2'>
        <label htmlFor='categoryImage'>Store Image</label>
        <ImageUpload
          disabled={isLoading}
          status={handleCheckErrorStatus<IStoreLocatorFormikValues>(formik, 'storeImgFile')}
          onRemoveImage={() => formik.setFieldValue('storeImgFile', null)}
          onChange={(event) => formik.setFieldValue('storeImgFile', event?.target?.files?.[0])}
        />
        {handleDisplayErrorMsg<IStoreLocatorFormikValues>(formik, 'storeImgFile')}
      </div>
      <ButtonComp loading={isLoading} isPrimary={false} htmlType='submit' className='ml-auto'>
        Ok
      </ButtonComp>
    </form>
  );
};

export default StoreLocatorForm;
