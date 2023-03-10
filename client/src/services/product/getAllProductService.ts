import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import axiosInstance from 'services/utils/axiosInstance';

const getAllProductService = async () => axiosInstance.get(`${PRODUCT_API_ENDPOINT}/get-all-product`);

export default getAllProductService;
