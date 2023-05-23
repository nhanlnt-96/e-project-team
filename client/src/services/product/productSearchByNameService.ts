import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { IProductData } from 'services/product/types';
import { axiosInstance } from 'services/utils';

const productSearchByNameService = async (productName: string): Promise<IProductData[]> => {
  return await axiosInstance.get(`${PRODUCT_API_ENDPOINT}/product-search?productName=${productName}`);
};

export default productSearchByNameService;
