import { useFormik } from 'formik';
import _ from 'lodash';
import { ICategoryData, ICreateCategoryData } from 'services/category';
import * as Yup from 'yup';

export interface ICategoryFormikValues {
  categoryName: string;
  categoryDescription: string;
  categoryImage: File | null;
}

// eslint-disable-next-line no-unused-vars
const useCategoryFormik = (onSubmit: (values: ICategoryFormikValues) => void, data?: ICategoryData) => {
  const initialValues: ICreateCategoryData = {
    categoryName: _.get(data, 'categoryName', ''),
    categoryDescription: _.get(data, 'categoryDescription', ''),
    categoryImage: null
  };

  return useFormik<ICategoryFormikValues>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      categoryName: Yup.string().required('Category name can not be null.'),
      categoryDescription: Yup.string().required('Category description can not be null.'),
      categoryImage: Yup.lazy(() => {
        if (data?.categoryImageName) {
          return Yup.mixed().notRequired();
        }

        return Yup.mixed().required('Category image is required.');
      })
    }),
    onSubmit: (values) => onSubmit(values)
  });
};

export default useCategoryFormik;
