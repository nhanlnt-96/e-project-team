import ButtonComp from 'components/buttonComp';
import ImageResponsive from 'components/imageResponsive';
import Loading from 'components/loading';
import PageContainer from 'components/pageContainer';
import SwiperComp from 'components/swiperComp';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getProductByIdThunk } from 'redux/productManage/getProductByIdSlice';
import { productDetailSelector } from 'redux/productManage/selector';
import { SwiperSlide } from 'swiper/react';
import { convertPrice } from 'utils/convertPrice';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

const ProductDetailPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, productData, error } = useAppSelector(productDetailSelector);
  const { productId } = useParams();

  useEffectOnce(() => {
    dispatch(getProductByIdThunk(Number.parseInt(productId as string)));
  });

  return !isLoading ? (
    productData ? (
      <PageContainer pageContainerClassName='space-y-4 max-w-screen-xl mx-auto md:space-y-6'>
        <div className='w-full flex flex-col space-y-6 lg:space-y-0 lg:space-x-8 lg:flex-row'>
          <div className='w-2/5 text-whie'>
            <SwiperComp navigation={true} loop className='text-white'>
              {productData.images.map((image) => (
                <SwiperSlide key={image.imageId}>
                  <ImageResponsive
                    isPreview
                    height={364}
                    width={485}
                    imageProps={{
                      src: imageLinkGeneration(image.storageName, image.imageName),
                      alt: productData.productName,
                      imageClassName: '!object-contain'
                    }}
                  />
                </SwiperSlide>
              ))}
            </SwiperComp>
          </div>
          <div className='w-3/5 text-white space-y-6'>
            <div>
              <h1 className='font-bold text-xl uppercase sm:text-2xl lg:text-3xl'>{productData.productName}</h1>
              <p className='text-taupe-gray font-playfair-display'>{productData.productId}</p>
            </div>
            <div className='space-y-2'>
              <h6 className='uppercase font-medium text-xs sm:text-sm'>{productData.category.categoryName}</h6>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-playfair-display sm:text-xl lg:text-2xl'>
                  {convertPrice(productData.productPrice)} <span className='text-xs sm:text-sm lg:text-base'>per</span> 50g
                </h2>
                <ButtonComp>Add to cart</ButtonComp>
              </div>
              <button type='button' className='underline uppercase tracking-widest hover:text-link-hover'>
                Add to favorites
              </button>
            </div>
          </div>
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
