import ImageResponsive from 'components/imageResponsive';
import SwiperComp from 'components/swiperComp';
import React from 'react';
import { IProductData } from 'services/product';
import { SwiperSlide } from 'swiper/react';
import { convertPrice } from 'utils/convertPrice';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  productData: IProductData;
}

const ProductDetailForm: React.FC<IProps> = ({ productData }) => {
  return (
    <div className='w-full space-y-6'>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>Product Id</p>
        <p className='text-right'>{productData.productId}</p>
      </div>
      <div className='w-full flex flex-col justify-center space-y-2'>
        <p className='text-gray-500 shrink-0'>Product Name</p>
        <p className='text-left'>{productData.productName}</p>
      </div>
      <div className='w-full flex flex-col justify-center space-y-2'>
        <p className='text-gray-500 shrink-0'>Product Price</p>
        <p className='text-left'>{convertPrice(productData.productPrice)}</p>
      </div>
      <div className='w-full flex flex-col justify-center space-y-2'>
        <p className='text-gray-500 shrink-0'>Category Name</p>
        <p className='text-left'>{productData.category.categoryName}</p>
      </div>
      <div className='w-full flex flex-col justify-center space-y-2'>
        <p className='text-gray-500 shrink-0'>Product Description</p>
        <p className='text-left' dangerouslySetInnerHTML={{ __html: productData.description }} />
      </div>
      <div className='w-full flex flex-col space-y-2'>
        <p className='text-gray-500 shrink-0'>Product Images</p>
        <div className='w-full'>
          <SwiperComp navigation={true} slidesPerView={4} spaceBetween={24}>
            {productData.images.map((image) => (
              <SwiperSlide key={image.imageName} className='w-full'>
                <ImageResponsive
                  width={120}
                  height={120}
                  imageProps={{
                    src: imageLinkGeneration(image.storageName, image.imageName),
                    alt: 'image-preview',
                    imageClassName: '!object-contain'
                  }}
                />
              </SwiperSlide>
            ))}
          </SwiperComp>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailForm;