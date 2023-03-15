import { ICategoryData } from 'services/category';

interface IImage {
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
