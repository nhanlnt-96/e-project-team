import { PRODUCT_FAVORITE_ENDPOINT } from 'services/productFavorite/configs';
import { axiosInstance } from 'services/utils';

const removeProductFavoriteService = async (productId: number) =>
  await axiosInstance.delete(`${PRODUCT_FAVORITE_ENDPOINT}/remove-product-favorite/${productId}`);

export default removeProductFavoriteService;
