import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { IProductData } from 'services/product/types';
import axiosInstance from 'services/utils/axiosInstance';

const getAllProductService = async (): Promise<any> => await axiosInstance.get(`${PRODUCT_API_ENDPOINT}/get-all-product`);

export default getAllProductService;
