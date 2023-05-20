import { CART_ENDPOINT, IRemoveFromCart } from 'services/cart/index';
import { axiosInstance } from 'services/utils';

const removeFromCartService = async (data: IRemoveFromCart) =>
  await axiosInstance.delete(`${CART_ENDPOINT}/remove-from-cart`, {
    data: { productId: data.productId, netWeightId: data.netWeightId }
  });

export default removeFromCartService;
