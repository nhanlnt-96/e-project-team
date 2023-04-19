import _ from 'lodash';
import { generateNetWeightObject } from 'services/netWeight';
import { IProductData, IProductQuantity } from 'services/product/types';

export const generateProductQuantity = (productQuantity: any): IProductQuantity => ({
  quantityId: _.get(productQuantity, 'quantityId', 0),
  quantity: _.get(productQuantity, 'quantity', 0),
  price: _.get(productQuantity, 'price', 0),
  netWeightDto: _.get(productQuantity, 'netWeightDto', null) ? generateNetWeightObject(_.get(productQuantity, 'netWeightDto')) : null
});

export const generateProductDataObject = (productData: any): IProductData => ({
  productId: _.get(productData, 'productId', ''),
  productName: _.get(productData, 'productName', ''),
  description: _.get(productData, 'description', ''),
  category: _.get(productData, 'category', ''),
  images: _.get(productData, 'images', []),
  productQuantityDtoList: _.get(productData, 'productQuantityDtoList', []).map((quantity: any) => generateProductQuantity(quantity))
});
