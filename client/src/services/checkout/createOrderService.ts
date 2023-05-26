import { CHECKOUT_ENDPOINT } from 'services/checkout/configs';
import { ICreatedOrderData } from 'services/checkout/types';
import { axiosInstance } from 'services/utils';

const createOrderService = async (orderData: ICreatedOrderData) => await axiosInstance.post(`${CHECKOUT_ENDPOINT}/create-order`, orderData);

export default createOrderService;
