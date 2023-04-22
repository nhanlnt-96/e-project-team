import _ from 'lodash';
import { IProductQuantityFormikValues } from 'pages/adminPage/productManagePage/productForm/useProductFormik';
import { IProductData } from 'services/product';

export const checkQuantityNotChangeInputData = (quantityList: IProductQuantityFormikValues[], referData: IProductData) => {
  return quantityList.filter((quantity) => {
    const checkQuantityInProductData = referData?.productQuantityDtoList.find((item) => item?.netWeightDto?.netWeightId === quantity.netWeightId);

    const productQuantity: IProductQuantityFormikValues = {
      quantity: _.get(checkQuantityInProductData, 'quantity', 0),
      price: _.get(checkQuantityInProductData, 'price', 0),
      netWeightId: _.get(checkQuantityInProductData?.netWeightDto, 'netWeightId', 0)
    };

    return Object.keys(quantity).every(
      (key) => quantity[key as keyof IProductQuantityFormikValues] === productQuantity[key as keyof IProductQuantityFormikValues]
    );
  });
};
