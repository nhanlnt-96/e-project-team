import _ from 'lodash';
import { ICartData, IProductInCart } from 'services/cart';

export const generateProductInCartObject = (product: any): IProductInCart => ({
  productId:_.get(product, 'productId', ''),
  productName:_.get(product, 'productName', ''),
  category:_.get(product, 'category', ''),
  description:_.get(product, 'description', ''),
  images:_.get(product, 'images', []),
  quantity:_.get(product, 'quantity', '')
});

export const generateCartDataObject = (data: any): ICartData => ({
  id: _.get(data, 'id', ''),
  userId: _.get(data, 'userId', ''),
  productsInCart: data?.productCartDtoList.map((product: any) => generateProductInCartObject(product))
});
