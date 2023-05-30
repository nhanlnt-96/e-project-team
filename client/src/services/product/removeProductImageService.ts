import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { axiosInstance } from 'services/utils';

const removeProductImageService = async (imageId: number, productId: number) => {
  return await axiosInstance.delete(`${PRODUCT_API_ENDPOINT}/remove-product-image?productId=${productId}&imageId=${imageId}`);
};

export default removeProductImageService;
