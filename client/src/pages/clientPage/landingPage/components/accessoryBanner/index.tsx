import BannerImage from 'assets/images/accessory-tea-banner.png';
import ImageResponsive from 'components/imageResponsive';
import { RouteBasePath } from 'constants/index';
import React from 'react';
import { Link } from 'react-router-dom';

const AccessoryBanner: React.FC = () => {
  return (
    <div className='w-full flex justify-center items-center flex-col space-y-10 md:flex-row md:space-y-0 md:space-x-10'>
      <div className='w-full md:w-1/3'>
        <p className='font-playfair-display text-center text-white text-lg italic leading-6 sm:text-xl sm:leading-10'>
          Beyond the remarkable flavours in the teacup, tea is a journey and a discovery of a wonderful heritage and tradition, an experience like no
          other...
        </p>
      </div>
      <Link
        to={`/${RouteBasePath.CLIENT_PRODUCT_PAGE_BASE_PATH}/52c9dece-28bb-49d9-983d-16c9a674b759-tea-accessories`}
        className='w-full block md:w-2/3'
      >
        <ImageResponsive width={810} height={539} imageProps={{ src: BannerImage, alt: 'tea-accessories' }} />
      </Link>
    </div>
  );
};

export default AccessoryBanner;
