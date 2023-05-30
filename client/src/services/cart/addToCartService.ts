import { CART_ENDPOINT } from 'services/cart/configs';
import { IAddToCartData } from 'services/cart/types';
import { axiosInstance } from 'services/utils';

const addToCartService = async (addToCartData: IAddToCartData) =>
  await axiosInstance.post(`${CART_ENDPOINT}/add-to-cart`, {
    netWeightId: addToCartData.netWeightId,
    productId: addToCartData.productId,
    quantity: addToCartData.quantity
  });

export default addToCartService;
