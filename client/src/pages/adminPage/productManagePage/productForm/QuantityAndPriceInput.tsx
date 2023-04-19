import { useProductFormContext } from 'context/index';
import { FormikProps } from 'formik';
import _ from 'lodash';
import QuantityAndPriceInputItem, { IQuantityPriceValue } from 'pages/adminPage/productManagePage/productForm/QuantityAndPriceInputItem';
import { IProductFormikValues } from 'pages/adminPage/productManagePage/productForm/useProductFormik';
import React, { useCallback, useState } from 'react';
import { validateObject } from 'utils/validateObject';

const QuantityAndPriceInput: React.FC = () => {
  const { formik: formikContext } = useProductFormContext();
  const formik = formikContext as FormikProps<IProductFormikValues>;
  const [numberOfItem, setNumberOfItem] = useState<number>(formik.values.productQuantityList.length || 1);

  const handleAddQuantityPrice = useCallback(
    (values: IQuantityPriceValue) => {
      if (validateObject<IQuantityPriceValue>(values)) {
        const productQuantityListTemp = _.clone(formik.values.productQuantityList);
        const quantityPriceExist = productQuantityListTemp.find((quantity) => quantity.netWeightId == values.netWeightId);

        if (!quantityPriceExist) {
          // INFO: add new line when save
          setNumberOfItem((prevState) => (prevState += 1));

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
      {[...new Array(numberOfItem)].map((_, index) => (
        <QuantityAndPriceInputItem key={index} onAddQuantityAndPrice={handleAddQuantityPrice} />
      ))}
    </div>
  );
};

export default QuantityAndPriceInput;
