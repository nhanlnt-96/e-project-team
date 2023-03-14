import ButtonComp from 'components/buttonComp';
import FileUpload from 'components/fileUpload';
import ImageResponsive from 'components/imageResponsive';
import InputComp from 'components/inputComp';
import { FormikProps } from 'formik';
import { handleCheckErrorStatus, handleDisplayErrorMsg } from 'helpers/formik';
import React, { useEffect, useState } from 'react';
import { ICreateCategoryData } from 'services/category';
import { fileToDataUri } from 'utils/fileToDataUri';

interface IProps {
  formik: FormikProps<ICreateCategoryData>;
}

const CategoryForm: React.FC<IProps> = ({ formik }) => {
  const [imageUri, setImageUri] = useState<string>('');

  useEffect(() => {
    if (formik.values.categoryImage) {
      fileToDataUri(formik.values.categoryImage).then((uri) => setImageUri(uri as string));
    } else {
      setImageUri('');
    }
  }, [formik.values.categoryImage]);

  return (
    <form onSubmit={formik.handleSubmit} className='w-full space-y-4'>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryName'>Category Name</label>
        <InputComp
          type='text'
          status={handleCheckErrorStatus<ICreateCategoryData>(formik, 'categoryName')}
          placeholder='Category name'
          name='categoryName'
          id='categoryName'
          value={formik.values.categoryName}
          onChange={formik.handleChange}
        />
        {handleDisplayErrorMsg<ICreateCategoryData>(formik, 'categoryName')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryImage'>Category Image</label>
        <FileUpload
          status={handleCheckErrorStatus<ICreateCategoryData>(formik, 'categoryImage')}
          id='categoryImage'
          name='categoryImage'
          onChange={(event) => formik.setFieldValue('categoryImage', event.currentTarget.files?.[0])}
        />
        {imageUri ? (
          <div className='w-full space-y-2'>
            <p>Category Image Preview</p>
            <ImageResponsive
              width={472}
              height={168}
              imageProps={{
                src: imageUri,
                alt: 'image-preview',
                imageClassName: '!object-contain'
              }}
            />
          </div>
        ) : (
          <></>
        )}
        {handleDisplayErrorMsg<ICreateCategoryData>(formik, 'categoryImage')}
      </div>
      <ButtonComp isPrimary={false} htmlType='submit' className='ml-auto'>
        Ok
      </ButtonComp>
    </form>
  );
};

export default CategoryForm;
