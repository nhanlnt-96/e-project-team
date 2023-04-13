import ButtonComp from 'components/buttonComp';
import EditorComp from 'components/editorComp';
import ImageUpload from 'components/imageUpload';
import InputComp from 'components/inputComp';
import { FormikProps } from 'formik';
import { handleCheckErrorStatus, handleDisplayErrorMsg } from 'helpers/formik';
import CategorySelect from 'pages/adminPage/productManage/productForm/CategorySelect';
import React from 'react';
import { ICreateProductData } from 'services/product';

interface IProps {
  formik: FormikProps<ICreateProductData>;
  isLoading: boolean;
  imageUrl?: string | string[];
  isDisabledSubmitButton: boolean;
}

const ProductForm: React.FC<IProps> = ({ formik, isLoading, imageUrl, isDisabledSubmitButton }) => {
  return (
    <form onSubmit={formik.handleSubmit} className='w-full space-y-4'>
      <div className='w-full space-y-2'>
        <label htmlFor='productName'>Category</label>
        <CategorySelect
          status={handleCheckErrorStatus<ICreateProductData>(formik, 'categoryId')}
          value={formik.values.categoryId}
          onChange={(value) => formik.setFieldValue('categoryId', value)}
        />
        {handleDisplayErrorMsg<ICreateProductData>(formik, 'categoryId')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='productName'>Product Name</label>
        <InputComp
          type='text'
          status={handleCheckErrorStatus<ICreateProductData>(formik, 'productName')}
          placeholder='Product name'
          name='productName'
          id='productName'
          value={formik.values.productName}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
        {handleDisplayErrorMsg<ICreateProductData>(formik, 'productName')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='productPrice'>Product Price</label>
        <InputComp
          type='number'
          status={handleCheckErrorStatus<ICreateProductData>(formik, 'productPrice')}
          placeholder='Product price'
          name='productPrice'
          id='productPrice'
          value={formik.values.productPrice}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
        {handleDisplayErrorMsg<ICreateProductData>(formik, 'productPrice')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='description'>Product Description</label>
        <EditorComp
          editorHeight={300}
          value={formik.values.description}
          onEditorChange={(content) => formik.setFieldValue('description', content)}
          status={handleCheckErrorStatus<ICreateProductData>(formik, 'description')}
        />
        {handleDisplayErrorMsg<ICreateProductData>(formik, 'description')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='images'>Product Image(s)</label>
        <ImageUpload
          disabled={isLoading}
          status={handleCheckErrorStatus<ICreateProductData>(formik, 'image')}
          id='categoryImage'
          name='categoryImage'
          multiple={true}
          onChange={(event) => formik.setFieldValue('image', event.currentTarget.files)}
          onRemoveImage={() => formik.setFieldValue('image', null)}
        />
        {handleDisplayErrorMsg<ICreateProductData>(formik, 'image')}
      </div>
      <ButtonComp loading={isLoading} isPrimary={false} htmlType='submit' className='ml-auto' disabled={isDisabledSubmitButton}>
        Ok
      </ButtonComp>
    </form>
  );
};

export default ProductForm;