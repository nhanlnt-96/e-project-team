import { PRODUCT_FAVORITE_ENDPOINT } from 'services/productFavorite/configs';
import { axiosInstance } from 'services/utils';

const addProductFavoriteService = async (productId: number) =>
  await axiosInstance.post(`${PRODUCT_FAVORITE_ENDPOINT}/add-product-favorite`, {
    productId: productId
  });

export default addProductFavoriteService;
