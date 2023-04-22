import { useProductFormContext } from 'context/index';
import { FormikProps } from 'formik';
import { useEffectOnce } from 'hooks/useEffectOnce';
import _ from 'lodash';
import QuantityAndPriceInputItem, { IQuantityPriceValue } from 'pages/adminPage/productManagePage/productForm/QuantityAndPriceInputItem';
import { IProductFormikValues, IProductQuantityFormikValues } from 'pages/adminPage/productManagePage/productForm/useProductFormik';
import React, { useCallback } from 'react';
import { IProductData } from 'services/product';
import { validateObject } from 'utils/validateObject';

interface IProps {
  productData?: IProductData;
}

const QuantityAndPriceInput: React.FC<IProps> = ({ productData }) => {
  const { formik: formikContext } = useProductFormContext();
  const formik = formikContext as FormikProps<IProductFormikValues>;

  useEffectOnce(() => {
    if (productData && productData.productQuantityDtoList.length) {
      const productQuantityList: IProductQuantityFormikValues[] = [];
      for (const quantityPrice of productData.productQuantityDtoList) {
        productQuantityList.push({
          price: _.get(quantityPrice, 'price', 0),
          quantity: _.get(quantityPrice, 'quantity', 0),
          netWeightId: _.get(quantityPrice.netWeightDto, 'netWeightId', 0)
        });
      }

      formik.setFieldValue('productQuantityList', productQuantityList);
    }
  });

  const handleAddQuantityPrice = useCallback(
    (values: IQuantityPriceValue) => {
      if (validateObject<IQuantityPriceValue>(values)) {
        const productQuantityListTemp = _.clone(formik.values.productQuantityList);
        const quantityPriceExist = productQuantityListTemp.find((quantity) => quantity.netWeightId == values.netWeightId);

        if (!quantityPriceExist) {
          productQuantityListTemp.push(values);
        } else {
          const indexOfExistQuantityPrice = productQuantityListTemp.indexOf(quantityPriceExist);

          productQuantityListTemp[indexOfExistQuantityPrice].netWeightId = values.netWeightId;

          productQuantityListTemp[indexOfExistQuantityPrice].quantity = values.quantity;

          productQuantityListTemp[indexOfExistQuantityPrice].price = values.price;
        }

        formik.setFieldValue('productQuantityList', productQuantityListTemp);
      }
    },
    [formik.values.productQuantityList]
  );

  return (
    <div className='w-full space-y-2'>
      {[...new Array(formik.values.productQuantityList.length + 1)].map((value, index) => (
        <QuantityAndPriceInputItem
          key={index}
          onAddQuantityAndPrice={handleAddQuantityPrice}
          defaultValues={formik.values.productQuantityList[index]}
          quantityId={
            productData?.productQuantityDtoList.find(
              (product) => product?.netWeightDto?.netWeightId === formik.values.productQuantityList[index]?.netWeightId
            )?.quantityId
          }
          productId={productData?.productId}
        />
      ))}
    </div>
  );
};

export default QuantityAndPriceInput;
