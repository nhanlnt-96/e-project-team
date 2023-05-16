import { IProductData } from 'services/product';
import { PRODUCT_FAVORITE_ENDPOINT } from 'services/productFavorite/configs';
import { axiosInstance } from 'services/utils';

export interface IProductFavoriteResponse {
  userId: number;
  productDtoList: IProductData[];
}

const getProductFavoriteService = async (): Promise<IProductFavoriteResponse> =>
  await axiosInstance.get(`${PRODUCT_FAVORITE_ENDPOINT}/get-product-favorite`);

export default getProductFavoriteService;
