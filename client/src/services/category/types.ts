export interface ICategoryData {
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  categoryImageName: string;
  storageName: string;
}

export interface ICreateCategoryData {
  categoryName: string;
  categoryImage: File | null;
}
