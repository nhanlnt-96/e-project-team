import { ICategoryData } from 'services/category/types';
import axiosInstance from 'services/utils/axiosInstance';

export const getAllCategoryService = async (): Promise<ICategoryData[]> => {
  return await axiosInstance.get('/category/get-all');
};
