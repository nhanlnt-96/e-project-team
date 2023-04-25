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
  if (updateData.productQuantityList?.length) {
    const productQuantityList = updateData.productQuantityList.map((quantity) => ({
      netWeightId: quantity.netWeightId,
      quantity: quantity.quantity,
      price: quantity.price
    }));

    formData.append('productQuantityList', JSON.stringify(productQuantityList));
  } else {
    formData.append('productQuantityList', JSON.stringify([]));
  }

  delete updateData.productQuantityList;

  formData.append('productUpdateData', JSON.stringify(updateData));

  return await axiosInstance.put(`${PRODUCT_API_ENDPOINT}/update-product`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export default updateProductService;
