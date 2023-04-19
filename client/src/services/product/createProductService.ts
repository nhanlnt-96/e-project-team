import { PRODUCT_API_ENDPOINT } from 'services/product/configs';
import { ICreateProductData } from 'services/product/types';
import { axiosInstance } from 'services/utils';

const createProductService = async (productData: ICreateProductData) => {
  const formData = new FormData();

  const createProductData = {
    productName: productData.productName,
    categoryId: productData.categoryId,
    description: productData.description
  };

  const productQuantityList = productData.productQuantityList.map((quantity) => ({
    netWeightId: quantity.netWeightId,
    quantity: quantity.quantity,
    price: quantity.price
  }));

  formData.append('createProductData', JSON.stringify(createProductData));

  formData.append('productQuantityList', JSON.stringify(productQuantityList));

  if (productData.image?.length) {
    for (const img of productData.image) {
      formData.append('productImages', img);
    }
  } else {
    formData.append('productImages', productData.image?.[0] as File);
  }

  return await axiosInstance.post(`${PRODUCT_API_ENDPOINT}/create-product`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export default createProductService;
