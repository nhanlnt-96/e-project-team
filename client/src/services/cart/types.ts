import { IProductData } from 'services/product';

export interface IProductInCart extends Omit<IProductData, 'productQuantityDtoList'> {
  quantity: number;
}

export interface ICartData {
  id: number;
  userId: number;
  productsInCart: IProductInCart[];
}

export interface IAddToCartData {
  netWeightId: number;
  productId: number;
  quantity: number;
}
