import { ICategoryData } from 'services/category';

export interface IImage {
  imageId: number;
  imageName: string;
  storageName: string;
}

export interface IProductData {
  productId: number;
  description: string;
  productPrice: number;
  productName: string;
  images: IImage[];
  category: ICategoryData;
}

export interface ICreateProductData {
  productName: string;
  productPrice: number;
  categoryId: number;
  description: string;
  image: File[] | null;
}
