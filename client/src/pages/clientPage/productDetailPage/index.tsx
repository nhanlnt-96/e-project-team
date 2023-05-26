import Loading from 'components/loading';
import PageContainer from 'components/pageContainer';
import RecentlyViewedProducts from 'components/recentlyViewedProducts';
import { LocalStorageName } from 'constants/index';
import { useEffectOnce } from 'hooks/useEffectOnce';
import ProductDescription from 'pages/clientPage/productDetailPage/ProductDescription';
import ProductImagePreview from 'pages/clientPage/productDetailPage/ProductImagePreview';
import ProductInformation from 'pages/clientPage/productDetailPage/ProductInformation';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProductByIdThunk } from 'redux/productManage/getProductByIdSlice';
import { productDetailSelector } from 'redux/productManage/selector';
import { IProductData } from 'services/product';

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, productData, error } = useAppSelector(productDetailSelector);
  const { productId } = useParams();

  useEffectOnce(() => {
    dispatch(getProductByIdThunk(Number.parseInt(productId as string)));
  });

  useEffect(() => {
    if (productData) {
      const viewedProductListString = window.sessionStorage.getItem(LocalStorageName.RECENTLY_VIEWED_PRODUCTS);
      if (viewedProductListString) {
        const listData = JSON.parse(viewedProductListString);
        if (!listData.find((product: IProductData) => product.productId === productData.productId)) {
          window.sessionStorage.setItem(LocalStorageName.RECENTLY_VIEWED_PRODUCTS, JSON.stringify([...listData, productData]));
        }
      } else {
        window.sessionStorage.setItem(LocalStorageName.RECENTLY_VIEWED_PRODUCTS, JSON.stringify([productData]));
      }
    }
  }, [productData]);

  return !isLoading ? (
    productData ? (
      <PageContainer pageContainerClassName='space-y-4 max-w-screen-xl mx-auto md:space-y-6'>
        <div className='w-full flex flex-col space-y-6 lg:space-y-0 lg:space-x-8 lg:flex-row'>
          <div className='lg:w-5/12 text-whie'>
            <ProductImagePreview productName={productData.productName} productImages={productData.images} />
          </div>
          <div className='lg:w-7/12 text-white space-y-6'>
            <ProductInformation productData={productData} />
          </div>
        </div>
        <ProductDescription description={productData.description} />
        <div className='w-full !mt-10'>
          <RecentlyViewedProducts slidesPerViewTablet={3} slidesPerViewDesktop={4} />
        </div>
      </PageContainer>
    ) : (
      <p>{error}</p>
    )
  ) : (
    <Loading isLoadingMask />
  );
};

export default ProductDetailPage;
