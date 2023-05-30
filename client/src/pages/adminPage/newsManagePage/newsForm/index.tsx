import ButtonComp from 'components/buttonComp';
import CheckboxComp from 'components/checkboxComp';
import EditorComp from 'components/editorComp';
import ImageUpload from 'components/imageUpload';
import ImagePreview from 'components/imageUpload/ImagePreview';
import InputComp from 'components/inputComp';
import { News } from 'constants/index';
import { handleCheckErrorStatus, handleDisplayErrorMsg } from 'helpers/formik';
import useNewsFormik, { INewsFormikValue } from 'pages/adminPage/newsManagePage/newsForm/useNewsFormik';
import React from 'react';
import { INewsData } from 'services/news';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  isLoading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (values: INewsFormikValue) => void;
  newsData?: INewsData;
}

const NewsForm: React.FC<IProps> = ({ onSubmit, isLoading, newsData }) => {
  const formik = useNewsFormik(onSubmit, newsData);

  return (
    <form onSubmit={formik.handleSubmit} className='w-full space-y-4'>
      <div className='w-full space-y-2'>
        <label htmlFor='newsTitle'>News Title</label>
        <InputComp
          type='text'
          status={handleCheckErrorStatus<INewsFormikValue>(formik, 'newsTitle')}
          placeholder='News Title'
          name='newsTitle'
          id='newsTitle'
          disabled={isLoading}
          value={formik.values.newsTitle}
          onChange={formik.handleChange}
        />
        {handleDisplayErrorMsg<INewsFormikValue>(formik, 'newsTitle')}
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='newsBody'>News Content</label>
        <EditorComp
          editorHeight={300}
          value={formik.values.newsBody}
          onEditorChange={(content) => formik.setFieldValue('newsBody', content)}
          status={handleCheckErrorStatus<INewsFormikValue>(formik, 'newsBody')}
        />
        {handleDisplayErrorMsg<INewsFormikValue>(formik, 'newsBody')}
      </div>
      <div className='w-full space-y-2'>
        <CheckboxComp
          id='isAboutUsNews'
          name='isAboutUsNews'
          checked={formik.values.isAboutUsNews === News.IS_ABOUT_US_NEWS}
          onChange={(event) => formik.setFieldValue('isAboutUsNews', event.target.checked ? News.IS_ABOUT_US_NEWS : News.IS_NEWS)}
        >
          Is About Us Content
        </CheckboxComp>
      </div>
      {newsData?.newsCoverImg ? (
        <div className='w-full space-y-2'>
          <label>News Cover Image Uploaded</label>
          <ImagePreview uri={imageLinkGeneration(newsData.newsCoverImg, '')} />
        </div>
      ) : (
        <></>
      )}
      <div className='w-full space-y-2'>
        <label htmlFor='categoryImage'>News Cover Image</label>
        <ImageUpload
          disabled={isLoading}
          status={handleCheckErrorStatus<INewsFormikValue>(formik, 'newsCoverImgFile')}
          onRemoveImage={() => formik.setFieldValue('newsCoverImgFile', null)}
          onChange={(event) => formik.setFieldValue('newsCoverImgFile', event?.target?.files?.[0])}
        />
        {handleDisplayErrorMsg<INewsFormikValue>(formik, 'newsCoverImgFile')}
      </div>
      <ButtonComp loading={isLoading} isPrimary={false} htmlType='submit' className='ml-auto'>
        Ok
      </ButtonComp>
    </form>
  );
};

export default NewsForm;
