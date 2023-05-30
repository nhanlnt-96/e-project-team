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
  price: number;
  netWeightDto: INetWeightData | null;
}

export interface IProductData {
  productId: number;
  description: string;
  productName: string;
  images: IImage[];
  category: ICategoryData;
  productQuantityDtoList: IProductQuantity[];
}

export interface IProductQuantityListItem {
  netWeightId: number;
  quantity: number;
  price: number;
}

export interface ICreateProductData {
  productName: string;
  categoryId: number;
  description: string;
  image: File[] | null;
  productQuantityList: IProductQuantityListItem[];
}

export interface IUpdateProductData {
  productId: number;
  productName?: string;
  categoryId?: number;
  description?: string;
  image?: File[];
  productQuantityList?: IProductQuantityListItem[];
}
