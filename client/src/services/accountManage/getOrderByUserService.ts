import { CHECKOUT_ENDPOINT } from 'services/checkout';
import { axiosInstance } from 'services/utils';

const getOrderByUserService = async (userId: number): Promise<any> => await axiosInstance.get(`${CHECKOUT_ENDPOINT}/get-user-order/${userId}`);

export default getOrderByUserService;
