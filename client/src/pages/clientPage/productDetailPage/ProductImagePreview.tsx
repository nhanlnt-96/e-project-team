import ImageResponsive from 'components/imageResponsive';
import SwiperComp from 'components/swiperComp';
import React from 'react';
import { IImage } from 'services/product';
import { SwiperSlide } from 'swiper/react';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  productName: string;
  productImages: IImage[];
}

const ProductImagePreview: React.FC<IProps> = ({ productName, productImages }) => {
  return (
    <SwiperComp navigation={true} loop className='text-white'>
      {productImages.map((image) => (
        <SwiperSlide key={image.imageId}>
          <ImageResponsive
            isPreview
            height={364}
            width={485}
            imageProps={{
              src: imageLinkGeneration(image.storageName, image.imageName),
              alt: productName,
              imageClassName: '!object-contain'
            }}
          />
        </SwiperSlide>
      ))}
    </SwiperComp>
  );
};

export default ProductImagePreview;
