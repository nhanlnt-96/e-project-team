import { message } from 'antd';
import { SvgIcons } from 'assets/icons/svgIcons';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import Title from 'components/title';
import { RouteBasePath } from 'constants/index';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import ProductForm from 'pages/adminPage/productManagePage/productForm';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProductByIdThunk } from 'redux/productManage/getProductByIdSlice';
import { productDetailSelector } from 'redux/productManage/selector';

const EditProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading: isFetchingProductData, productData, error } = useAppSelector(productDetailSelector);
  const [messageApi, contextHolder] = message.useMessage();
  const [isUpdatingProduct, setIsUpdatingProduct] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getProductByIdThunk(Number.parseInt(productId as string)));
  }, [productId]);

  const handleUpdateProduct = useCallback(async () => {
    console.log('hehe');
  }, []);

  const handleGoToPrevPage = () => navigate(RouteBasePath.ADMIN_PRODUCT_MANAGE_PAGE_BASE_PATH);

  return !isFetchingProductData ? (
    <>
      {contextHolder}
      <SectionContainer>
        <Title title={'Update Product'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
        {productData ? (
          <ProductForm isLoading={isUpdatingProduct} onSubmit={handleUpdateProduct} productData={productData} />
        ) : (
          <ModalComp onCloseModal={handleGoToPrevPage} isOpenModal={true}>
            <div className='w-full flex flex-col justify-center items-center space-y-2'>
              {React.cloneElement(SvgIcons.XCircle, { className: 'text-red-700 w-10 h-10' })}
              <h6 className='text-lg font-medium'>Product not found</h6>
            </div>
          </ModalComp>
        )}
      </SectionContainer>
    </>
  ) : (
    <Loading />
  );
};

export default EditProductPage;
