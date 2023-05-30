import { CATEGORY_API_ENDPOINT } from 'services/category/configs';
import { ICategoryData } from 'services/category/types';
import { axiosInstance } from 'services/utils';

const getCategoryBySlugService = async (categorySlug: string): Promise<any> => {
  return await axiosInstance.get(`${CATEGORY_API_ENDPOINT}/get-category-by-slug/${categorySlug}`);
};

export default getCategoryBySlugService;
