import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { IProductData } from 'services/product/types';
import { axiosInstance } from 'services/utils';

const getProductByCategorySlugService = async (categorySlug: string): Promise<any> => {
  return await axiosInstance.get(`${PRODUCT_API_ENDPOINT}/get-product-by-category-slug?categorySlug=${categorySlug}`);
};

export default getProductByCategorySlugService;
