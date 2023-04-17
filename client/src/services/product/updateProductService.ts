import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { IUpdateProductData } from 'services/product/types';
import { axiosInstance } from 'services/utils';

const updateProductService = async (updateData: IUpdateProductData) => {
  const formData = new FormData();

  if (updateData.image?.length) {
    for (const img of updateData.image) {
      formData.append('productImages', img);
    }

    delete updateData.image;
  }

  formData.append('productUpdateData', JSON.stringify(updateData));

  return await axiosInstance.put(`${PRODUCT_API_ENDPOINT}/update-product`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export default updateProductService;