import { message } from 'antd';
import ButtonComp from 'components/buttonComp';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import ProductForm from 'pages/adminPage/productManage/productForm';
import { IProductFormikValues } from 'pages/adminPage/productManage/productForm/useProductFormik';
import React, { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { getAllProductThunk } from 'redux/productManage/getAllProductSlice';
import { createProductService, ICreateProductData } from 'services/product';

const CreateNewProductButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState<boolean>(false);
  const handleOpenModal = () => setIsShowModal(true);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleCreateNewProduct = async (values: IProductFormikValues) => {
    setIsCreatingProduct(true);
    try {
      const productData: ICreateProductData = {
        categoryId: values.categoryId,
        productName: values.productName,
        productPrice: values.productPrice,
        description: values.description,
        image: values.productImages
      };
      const response = await createProductService(productData);
      if (response) {
        messageApi.open({
          type: 'success',
          content: 'Product is created.'
        });

        dispatch(getAllProductThunk());

        handleCloseModal();
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error as string
      });
    }

    setIsCreatingProduct(false);
  };

  return (
    <>
      {contextHolder}
      <ButtonComp onClick={handleOpenModal} isPrimary={false}>
        Create new product
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title='Create new product' destroyOnClose>
        <ProductForm isLoading={isCreatingProduct} onSubmit={handleCreateNewProduct} />
      </ModalComp>
      {isCreatingProduct ? <Loading isLoadingMask={true} /> : <></>}
    </>
  );
};

export default CreateNewProductButton;
