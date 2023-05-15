import { IProductData } from 'services/product';
import { PRODUCT_FAVORITE_ENDPOINT } from 'services/productFavorite/configs';
import { axiosInstance } from 'services/utils';

const getProductFavoriteService = async (): Promise<{ userId: number; productDtoList: IProductData[] }> =>
  await axiosInstance.get(`${PRODUCT_FAVORITE_ENDPOINT}/get-product-favorite`);

export default getProductFavoriteService;
