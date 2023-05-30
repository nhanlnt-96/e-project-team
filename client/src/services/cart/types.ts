import { INetWeightData } from 'services/netWeight';
import { IProductData, IProductQuantity } from 'services/product';

export interface IProductInCart extends Omit<IProductData, 'productQuantityDtoList'> {
  quantity: number;
  netWeightDto: INetWeightData;
  productQuantityDto: IProductQuantity;
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

export interface IRemoveFromCart {
  netWeightId: number;
  productId: number;
}
