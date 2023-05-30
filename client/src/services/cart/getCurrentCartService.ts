import { CART_ENDPOINT } from 'services/cart/configs';
import { axiosInstance } from 'services/utils';

const getCurrentCartService = async () => await axiosInstance.get(`${CART_ENDPOINT}/get-current-cart`);

export default getCurrentCartService;
