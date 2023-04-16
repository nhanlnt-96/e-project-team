import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { axiosInstance } from 'services/utils';

const removeProductService = async (productId: number) => {
  return await axiosInstance.delete(`${PRODUCT_API_ENDPOINT}/remove-product/${productId}`);
};

export default removeProductService;
