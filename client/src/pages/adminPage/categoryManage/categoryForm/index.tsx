import ButtonComp from 'components/buttonComp';
import EditorComp from 'components/editorComp';
import ImageUpload from 'components/imageUpload';
import InputComp from 'components/inputComp';
import { FormikProps } from 'formik';
import { handleCheckErrorStatus, handleDisplayErrorMsg } from 'helpers/formik';
import React from 'react';
import { ICreateCategoryData } from 'services/category';

interface IProps {
  formik: FormikProps<ICreateCategoryData>;
  isLoading?: boolean;
  imageUrl?: string;
  isDisabledSubmitButton?: boolean;
}

const CategoryForm: React.FC<IProps> = ({ formik, isLoading, imageUrl, isDisabledSubmitButton }) => {
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
          disabled={isLoading}
        />
        {handleDisplayErrorMsg<ICreateCategoryData>(formik, 'categoryName')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryDescription'>Category Description</label>
        <EditorComp
          editorHeight={300}
          value={formik.values.categoryDescription}
          onEditorChange={(content) => formik.setFieldValue('categoryDescription', content)}
        />
        {handleDisplayErrorMsg<ICreateCategoryData>(formik, 'categoryDescription')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryImage'>Category Image</label>
        <ImageUpload
          imageUrl={imageUrl}
          disabled={isLoading}
          status={handleCheckErrorStatus<ICreateCategoryData>(formik, 'categoryImage')}
          id='categoryImage'
          name='categoryImage'
          onChange={(event) => formik.setFieldValue('categoryImage', event.currentTarget.files?.[0])}
          onRemoveImage={() => formik.setFieldValue('categoryImage', null)}
        />
        {handleDisplayErrorMsg<ICreateCategoryData>(formik, 'categoryImage')}
      </div>
      <ButtonComp loading={isLoading} isPrimary={false} htmlType='submit' className='ml-auto' disabled={isDisabledSubmitButton}>
        Ok
      </ButtonComp>
    </form>
  );
};

export default CategoryForm;
