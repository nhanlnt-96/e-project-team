import _ from 'lodash';
import { generateProductQuantity } from 'redux/productManage/utils';
import { ICartData, IProductInCart } from 'services/cart';
import { generateNetWeightObject } from 'services/netWeight';

export const generateProductInCartObject = (product: any): IProductInCart => ({
  productId: _.get(product, 'productId', ''),
  productName: _.get(product, 'productName', ''),
  category: _.get(product, 'category', ''),
  description: _.get(product, 'description', ''),
  images: _.get(product, 'images', []),
  netWeightDto: generateNetWeightObject(product.netWeightDto),
  productQuantityDto: generateProductQuantity(product.productQuantityDto),
  quantity: _.get(product, 'quantity', '')
});

export const generateCartDataObject = (data: any): ICartData => ({
  id: _.get(data, 'id', ''),
  userId: _.get(data, 'userId', ''),
  productsInCart: data?.productCartDtoList.map((product: any) => generateProductInCartObject(product))
});
