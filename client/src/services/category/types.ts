export interface ICategoryData {
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  categoryImageName: string;
  storageName: string;
  categoryDescription: string;
}

export interface ICreateCategoryData {
  categoryName: string;
  categoryDescription: string;
  categoryImage: File | null;
}

export interface IUpdateCategoryData {
  categoryId: number;
  categoryName?: string;
  categoryImage?: File | null;
  categoryDescription?: string;
}
