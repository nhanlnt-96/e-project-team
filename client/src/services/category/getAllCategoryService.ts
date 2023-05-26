import { CATEGORY_API_ENDPOINT } from 'services/category/configs';
import { ICategoryData } from 'services/category/types';
import axiosInstance from 'services/utils/axiosInstance';

const getAllCategoryService = async (): Promise<any> => {
  return await axiosInstance.get(`${CATEGORY_API_ENDPOINT}/get-all`);
};

export default getAllCategoryService;
