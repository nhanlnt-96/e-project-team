import ProductCard from 'components/productCard';
import SwiperComp from 'components/swiperComp';
import Title from 'components/title';
import { LocalStorageName } from 'constants/index';
import React, { useEffect, useState } from 'react';
import { IProductData } from 'services/product';
import { SwiperSlide } from 'swiper/react';

interface IProps {
  slidesPerViewMobile?: number;
  slidesPerViewTablet?: number;
  slidesPerViewDesktop?: number;
}

const RecentlyViewedProducts: React.FC<IProps> = ({ slidesPerViewMobile = 1, slidesPerViewTablet = 2, slidesPerViewDesktop = 3 }) => {
  const [productData, setProductData] = useState<IProductData[]>([]);

  useEffect(() => {
    const viewedProductString = window.sessionStorage.getItem(LocalStorageName.RECENTLY_VIEWED_PRODUCTS);
    if (viewedProductString) {
      const productDataList: IProductData[] = JSON.parse(viewedProductString);

      setProductData(productDataList);
    }
  }, []);

  return productData.length ? (
    <div className='w-full text-white space-y-4 sm:space-y-8'>
      <Title variant='h6' title='Recently Viewed Products' titleClassName='!font-jost text-2xl font-medium !uppercase not-italic sm:text-3xl' />
      <SwiperComp
        slidesPerView={slidesPerViewMobile}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: slidesPerViewTablet,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: slidesPerViewDesktop,
            spaceBetween: 20
          }
        }}
      >
        {productData.map((product) => (
          <SwiperSlide key={product.productId} className='text-white'>
            <ProductCard productData={product} />
          </SwiperSlide>
        ))}
      </SwiperComp>
    </div>
  ) : (
    <></>
  );
};

export default RecentlyViewedProducts;
