import { PRODUCT_FAVORITE_ENDPOINT } from 'services/productFavorite';
import { IProductFavoriteResponse } from 'services/productFavorite/getProductFavoriteService';
import { axiosInstance } from 'services/utils';

const getUserProductFavoriteService = async (userId: number): Promise<IProductFavoriteResponse> =>
  await axiosInstance.get(`${PRODUCT_FAVORITE_ENDPOINT}/get-user-product-favorite/${userId}`);

export default getUserProductFavoriteService;
