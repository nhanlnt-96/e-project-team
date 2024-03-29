import ButtonComp from 'components/buttonComp';
import EditorComp from 'components/editorComp';
import ImageUpload from 'components/imageUpload';
import InputComp from 'components/inputComp';
import { AllowNumber } from 'constants/index';
import { ProductFormContext } from 'context/index';
import { handleCheckErrorStatus, handleDisplayErrorMsg } from 'helpers/formik';
import _ from 'lodash';
import CategorySelect from 'pages/adminPage/productManagePage/productForm/CategorySelect';
import ProductImageUploaded from 'pages/adminPage/productManagePage/productForm/ProductImageUploaded';
import QuantityAndPriceInput from 'pages/adminPage/productManagePage/productForm/QuantityAndPriceInput';
import useProductFormik, { IProductFormikValues } from 'pages/adminPage/productManagePage/productForm/useProductFormik';
import { checkQuantityNotChangeInputData } from 'pages/adminPage/productManagePage/productForm/utils';
import React, { useCallback, useMemo } from 'react';
import { IProductData } from 'services/product';

interface IProps {
  isLoading: boolean;
  productData?: IProductData;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: IProductFormikValues) => void;
}

const ProductForm: React.FC<IProps> = ({ isLoading, productData, onSubmit }) => {
  const formik = useProductFormik(onSubmit, productData);

  const handleRemoveImage = useCallback(
    (index: number) => {
      const productImagesTemp = _.clone(formik.values.productImages);

      productImagesTemp?.splice(index, 1);

      formik.setFieldValue('productImages', productImagesTemp);
    },
    [formik.values.productImages]
  );

  const handleDisableSubmitButton = useMemo(() => {
    return (
      productData &&
      formik.values.categoryId === productData.category.categoryId &&
      !formik.values.productImages.length &&
      formik.values.productName === productData.productName &&
      formik.values.description === productData.description &&
      formik.values.productQuantityList.length === productData.productQuantityDtoList.length &&
      !formik.values.productQuantityList.filter((quantity) => {
        if (
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          checkQuantityNotChangeInputData(formik.values.productQuantityList, productData!).every((item) => item.netWeightId !== quantity.netWeightId)
        ) {
          return quantity;
        }
      }).length
    );
  }, [formik.values, productData]);

  return (
    <ProductFormContext.Provider value={{ formik }}>
      <form onSubmit={formik.handleSubmit} className='w-full max-w-5xl mx-auto space-y-4'>
        <div className='w-full space-y-2'>
          <label htmlFor='productName'>Category</label>
          <CategorySelect
            status={handleCheckErrorStatus<IProductFormikValues>(formik, 'categoryId')}
            value={formik.values.categoryId}
            onChange={(value) => formik.setFieldValue('categoryId', value)}
          />
          {handleDisplayErrorMsg<IProductFormikValues>(formik, 'categoryId')}
        </div>
        <div className='w-full space-y-2'>
          <label htmlFor='productName'>Product Name</label>
          <InputComp
            type='text'
            status={handleCheckErrorStatus<IProductFormikValues>(formik, 'productName')}
            placeholder='Product name'
            name='productName'
            id='productName'
            value={formik.values.productName}
            onChange={formik.handleChange}
            disabled={isLoading}
          />
          {handleDisplayErrorMsg<IProductFormikValues>(formik, 'productName')}
        </div>
        <div className='w-full space-y-2'>
          <label>Product Quantity and Price</label>
          <QuantityAndPriceInput productData={productData} />
          {handleDisplayErrorMsg<IProductFormikValues>(formik, 'productQuantityList')}
        </div>
        <div className='w-full space-y-2'>
          <label htmlFor='description'>Product Description</label>
          <EditorComp
            editorHeight={300}
            value={formik.values.description}
            onEditorChange={(content) => formik.setFieldValue('description', content)}
            status={handleCheckErrorStatus<IProductFormikValues>(formik, 'description')}
          />
          {handleDisplayErrorMsg<IProductFormikValues>(formik, 'description')}
        </div>
        {productData?.images.length ? <ProductImageUploaded images={productData.images} productId={productData.productId} /> : <></>}
        <div className='w-full space-y-2'>
          <label htmlFor='productImages'>
            Product Image(s) ({formik.values.productImages.length}/{AllowNumber.MAXIMUM_ALLOW_UPLOAD_PRODUCT_IMAGE})
          </label>
          <ImageUpload
            disabled={isLoading}
            status={handleCheckErrorStatus<IProductFormikValues>(formik, 'productImages')}
            onRemoveImage={(index) => handleRemoveImage(index as number)}
            multiple={true}
            onChange={(event) => formik.setFieldValue('productImages', Array.from(event?.target?.files as FileList))}
          />
          {handleDisplayErrorMsg<IProductFormikValues>(formik, 'productImages')}
        </div>
        <ButtonComp loading={isLoading} isPrimary={false} htmlType='submit' className='ml-auto' disabled={handleDisableSubmitButton}>
          Ok
        </ButtonComp>
      </form>
    </ProductFormContext.Provider>
  );
};

export default ProductForm;
