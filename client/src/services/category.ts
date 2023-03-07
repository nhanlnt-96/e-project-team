import axiosInstance from 'services/utils/axiosInstance';

export const getAllCategoryService = async () => {
  return await axiosInstance.get('/category/get-all');
};
