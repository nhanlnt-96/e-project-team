import { CATEGORY_API_ENDPOINT } from 'services/category/configs';
import { axiosInstance } from 'services/utils';

const removeCategoryService = async (categoryId: number) => {
  return await axiosInstance.delete(`${CATEGORY_API_ENDPOINT}/remove-category/${categoryId}`);
};

export default removeCategoryService;