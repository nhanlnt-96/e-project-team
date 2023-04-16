import _ from 'lodash';
import { IProductData } from 'services/product/types';

export const generateProductDataObject = (productData: any): IProductData => ({
  productId: _.get(productData, 'productId', ''),
  productName: _.get(productData, 'productName', ''),
  productPrice: _.get(productData, 'productPrice', ''),
  description: _.get(productData, 'description', ''),
  category: _.get(productData, 'category', ''),
  images: _.get(productData, 'images', [])
});
