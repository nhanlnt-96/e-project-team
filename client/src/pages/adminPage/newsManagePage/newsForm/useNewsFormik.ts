import { useFormik } from 'formik';
import _ from 'lodash';
import { INewsData } from 'services/news';
import * as Yup from 'yup';

export interface INewsFormikValue {
  newsTitle: string;
  newsBody: string;
}

// eslint-disable-next-line no-unused-vars
const useNewsFormik = (onSubmit: (values: INewsFormikValue) => void, newsData?: INewsData) => {
  const initialValues: INewsFormikValue = {
    newsTitle: _.get(newsData, 'newsTitle', ''),
    newsBody: _.get(newsData, 'newsBody', '')
  };

  return useFormik<INewsFormikValue>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      newsTitle: Yup.string().required('News title can not be null.'),
      newsBody: Yup.string().required('News body can not be null.')
    }),
    onSubmit: (values) => onSubmit(values)
  });
};

export default useNewsFormik;
