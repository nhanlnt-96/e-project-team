import { CATEGORY_API_ENDPOINT } from 'services/category/configs';
import { IUpdateCategoryData } from 'services/category/types';
import { axiosInstance } from 'services/utils';

const updateCategoryService = async (updateCategoryData: IUpdateCategoryData) => {
  const formData = new FormData();

  if (updateCategoryData.categoryImage) {
    formData.append('categoryImage', updateCategoryData.categoryImage as File);

    delete updateCategoryData.categoryImage;
  }

  formData.append('categoryUpdateData', JSON.stringify(updateCategoryData));

  return await axiosInstance.put(`${CATEGORY_API_ENDPOINT}/update-category`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export default updateCategoryService;
