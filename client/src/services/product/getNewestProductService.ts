import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { axiosInstance } from 'services/utils';

const getNewestProductService = async (): Promise<any> => await axiosInstance.get(`${PRODUCT_API_ENDPOINT}/get-newest-products`);

export default getNewestProductService;
