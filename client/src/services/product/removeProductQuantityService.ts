import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { axiosInstance } from 'services/utils';

const removeProductQuantityService = (quantityId: number) => {
  return axiosInstance.delete(`${PRODUCT_API_ENDPOINT}/remove-product-quantity?quantityId=${quantityId}`);
};

export default removeProductQuantityService;
