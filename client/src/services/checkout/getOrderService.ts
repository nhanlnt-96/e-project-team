import { CHECKOUT_ENDPOINT } from 'services/checkout/configs';
import { axiosInstance } from 'services/utils';

const getOrderService = async (): Promise<any> => await axiosInstance(`${CHECKOUT_ENDPOINT}/get-all-order`);

export default getOrderService;
