import {CATEGORY_API_ENDPOINT} from 'services/category/configs';
import {ICreateCategoryData} from 'services/category/types';
import {axiosInstance} from 'services/utils';

const createCategoryService = async (categoryData: ICreateCategoryData) => {
    const formData = new FormData();

    const categoryInfoData = {
        categoryName: categoryData.categoryName,
        categoryDescription: categoryData.categoryDescription
    };

    formData.append('categoryImage', categoryData.categoryImage as File);

    formData.append('createProductCategory', JSON.stringify(categoryInfoData));

    return await axiosInstance.post(`${CATEGORY_API_ENDPOINT}/create-category`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
};

export default createCategoryService;
