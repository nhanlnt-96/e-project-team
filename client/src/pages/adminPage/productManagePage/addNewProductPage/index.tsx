import { message } from 'antd';
import Loading from 'components/loading';
import Title from 'components/title';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import ProductForm from 'pages/adminPage/productManagePage/productForm';
import { IProductFormikValues } from 'pages/adminPage/productManagePage/productForm/useProductFormik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { getAllProductThunk } from 'redux/productManage/getAllProductSlice';
import { createProductService, ICreateProductData } from 'services/product';

const AddNewProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isCreatingProduct, setIsCreatingProduct] = useState<boolean>(false);

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
        toast.success('Product is created.');

        dispatch(getAllProductThunk());

        navigate('..', { relative: 'path' });
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsCreatingProduct(false);
    }
  };

  return (
    <>
      <SectionContainer>
        <Title title={'Add new Product'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
        <ProductForm isLoading={isCreatingProduct} onSubmit={handleCreateNewProduct} />
      </SectionContainer>
      {isCreatingProduct ? <Loading isLoadingMask={true} /> : <></>}
    </>
  );
};

export default AddNewProductPage;
