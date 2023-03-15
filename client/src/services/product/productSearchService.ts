import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { IProductData } from 'services/product/types';
import { axiosInstance } from 'services/utils';

const productSearchService = async (categorySlug: string): Promise<IProductData[]> => {
  return await axiosInstance.get(`${PRODUCT_API_ENDPOINT}/product-search?categorySlug=${categorySlug}`);
};

export default productSearchService;
