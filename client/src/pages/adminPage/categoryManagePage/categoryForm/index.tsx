import ButtonComp from 'components/buttonComp';
import EditorComp from 'components/editorComp';
import ImageUpload from 'components/imageUpload';
import ImagePreview from 'components/imageUpload/ImagePreview';
import InputComp from 'components/inputComp';
import { handleCheckErrorStatus, handleDisplayErrorMsg } from 'helpers/formik';
import useCategoryFormik, { ICategoryFormikValues } from 'pages/adminPage/categoryManagePage/categoryForm/useCategoryFormik';
import React from 'react';
import { ICategoryData } from 'services/category';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: ICategoryFormikValues) => void;
  isLoading?: boolean;
  categoryData?: ICategoryData;
}

const CategoryForm: React.FC<IProps> = ({ onSubmit, isLoading, categoryData }) => {
  const formik = useCategoryFormik(onSubmit, categoryData);

  return (
    <form onSubmit={formik.handleSubmit} className='w-full space-y-4'>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryName'>Category Name</label>
        <InputComp
          type='text'
          status={handleCheckErrorStatus<ICategoryFormikValues>(formik, 'categoryName')}
          placeholder='Category name'
          name='categoryName'
          id='categoryName'
          value={formik.values.categoryName}
          onChange={formik.handleChange}
          disabled={isLoading}
        />
        {handleDisplayErrorMsg<ICategoryFormikValues>(formik, 'categoryName')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryDescription'>Category Description</label>
        <EditorComp
          editorHeight={300}
          value={formik.values.categoryDescription}
          onEditorChange={(content) => formik.setFieldValue('categoryDescription', content)}
        />
        {handleDisplayErrorMsg<ICategoryFormikValues>(formik, 'categoryDescription')}
      </div>
      {categoryData?.categoryImageName ? (
        <div className='w-full space-y-2'>
          <label>Category Image Uploaded</label>
          <ImagePreview uri={imageLinkGeneration(categoryData.storageName, categoryData.categoryImageName)} />
        </div>
      ) : (
        <></>
      )}
      <div className='w-full space-y-2'>
        <label htmlFor='categoryImage'>Category Image</label>
        <ImageUpload
          disabled={isLoading}
          status={handleCheckErrorStatus<ICategoryFormikValues>(formik, 'categoryImage')}
          onRemoveImage={() => formik.setFieldValue('categoryImage', null)}
          onChange={(event) => formik.setFieldValue('categoryImage', event?.target?.files?.[0])}
        />
        {handleDisplayErrorMsg<ICategoryFormikValues>(formik, 'categoryImage')}
      </div>
      <ButtonComp loading={isLoading} isPrimary={false} htmlType='submit' className='ml-auto'>
        Ok
      </ButtonComp>
    </form>
  );
};

export default CategoryForm;
