import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { axiosInstance } from 'services/utils';

const getProductByIdService = async (productId: number) => await axiosInstance.get(`${PRODUCT_API_ENDPOINT}/get-product-by-id/${productId}`);

export default getProductByIdService;
