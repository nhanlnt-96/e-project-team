import { AllowNumber } from 'constants/index';
import { useFormik } from 'formik';
import _ from 'lodash';
import { IProductData } from 'services/product';
import * as Yup from 'yup';

export interface IProductQuantityFormikValues {
  index?: number;
  netWeightId: number;
  quantity: number;
  price: number;
}

export interface IProductFormikValues {
  productName: string;
  description: string;
  productQuantityList: IProductQuantityFormikValues[];
  productImages: File[];
  categoryId: number;
}

// eslint-disable-next-line no-unused-vars
const useProductFormik = (onSubmit: (values: IProductFormikValues) => void, productData?: IProductData) => {
  const initialValues: IProductFormikValues = {
    productName: _.get(productData, 'productName', ''),
    productQuantityList: [],
    description: _.get(productData, 'description', ''),
    productImages: [],
    categoryId: _.get(productData?.category, 'categoryId', 0)
  };

  return useFormik<IProductFormikValues>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      productName: Yup.string().required('Product name can not be null.'),
      productQuantityList: Yup.lazy(() => {
        if (productData?.productQuantityDtoList.length) {
          return Yup.array(
            Yup.object().shape({
              netWeightId: Yup.number(),
              quantity: Yup.number(),
              price: Yup.number()
            })
          ).notRequired();
        }

        return Yup.array(
          Yup.object().shape({
            netWeightId: Yup.number(),
            quantity: Yup.number(),
            price: Yup.number()
          })
        ).min(1, 'Quantity and Price must have at least 1 record.');
      }),
      description: Yup.string().required('Product description can not be null.'),
      productImages: Yup.lazy(() => {
        if (productData?.images.length) {
          const maxImageAllowed = AllowNumber.MAXIMUM_ALLOW_UPLOAD_PRODUCT_IMAGE - productData?.images.length;

          return Yup.array().of(Yup.mixed()).max(maxImageAllowed, `Only ${maxImageAllowed} product images are allowed.`).notRequired();
        }

        return Yup.array()
          .of(Yup.mixed())
          .min(AllowNumber.MIN_ALLOW_UPLOAD_PRODUCT_IMAGE, 'Product image(s) must have at least 1 image.')
          .max(AllowNumber.MAXIMUM_ALLOW_UPLOAD_PRODUCT_IMAGE, 'Only 5 product images are allowed.');
      }),
      categoryId: Yup.number().min(1, 'Please select a category.').typeError('Please select a category.')
    }),
    onSubmit: (values) => onSubmit(values)
  });
};

export default useProductFormik;
