import { FormikProps } from 'formik';
import { IProductFormikValues } from 'pages/adminPage/productManagePage/productForm/useProductFormik';
import { createContext } from 'react';

export interface IProductFormContext {
  formik: FormikProps<IProductFormikValues> | null;
}

const initialStates: IProductFormContext = {
  formik: null
};
const ProductFormContext = createContext(initialStates);

export default ProductFormContext;
