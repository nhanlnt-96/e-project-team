import { ICategoryData } from 'services/category';
import { INetWeightData } from 'services/netWeight';

export interface IImage {
  imageId: number;
  imageName: string;
  storageName: string;
}

export interface IProductQuantity {
  quantityId: number;
  quantity: number;
  netWeightDto: INetWeightData | null;
}

export interface IProductData {
  productId: number;
  description: string;
  productPrice: number;
  productName: string;
  images: IImage[];
  category: ICategoryData;
  productQuantityDtoList: IProductQuantity[];
}

export interface ICreateProductData {
  productName: string;
  productPrice: number;
  categoryId: number;
  description: string;
  image: File[] | null;
}

export interface IUpdateProductData {
  productId: number;
  productName?: string;
  productPrice?: number;
  categoryId?: number;
  description?: string;
  image?: File[];
}
