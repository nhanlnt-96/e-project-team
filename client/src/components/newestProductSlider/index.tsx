import ProductCard from 'components/productCard';
import SwiperComp from 'components/swiperComp';
import Title from 'components/title';
import { useEffectOnce } from 'hooks/useEffectOnce';
import React, { useState } from 'react';
import { generateProductDataObject } from 'redux/productManage/utils';
import { getNewestProductService, IProductData } from 'services/product';
import { SwiperSlide } from 'swiper/react';

const NewestProductSlider = () => {
  const [newestProductData, setNewestProductData] = useState<IProductData[]>([]);

  useEffectOnce(() => {
    if (!newestProductData.length) {
      (async () => {
        const response = await getNewestProductService();
        if (response) {
          const productData: IProductData[] = [];
          for (const product of response) {
            productData.push(generateProductDataObject(product));
          }

          setNewestProductData(productData);
        }
      })();
    }
  });

  return newestProductData.length ? (
    <div className='w-full text-white space-y-4 sm:space-y-8'>
      <Title variant='h6' title='Newest Products' titleClassName='!font-jost text-2xl font-medium !uppercase not-italic sm:text-3xl' />
      <SwiperComp
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }}
      >
        {newestProductData.map((product) => (
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

export default NewestProductSlider;
