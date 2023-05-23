import ButtonComp from 'components/buttonComp';
import EditorComp from 'components/editorComp';
import InputComp from 'components/inputComp';
import { handleCheckErrorStatus, handleDisplayErrorMsg } from 'helpers/formik';
import useNewsFormik, { INewsFormikValue } from 'pages/adminPage/newsManagePage/newsForm/useNewsFormik';
import React from 'react';
import { INewsData } from 'services/news';

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
      <ButtonComp loading={isLoading} isPrimary={false} htmlType='submit' className='ml-auto'>
        Ok
      </ButtonComp>
    </form>
  );
};

export default NewsForm;
