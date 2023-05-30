import ImageResponsive from 'components/imageResponsive';
import CardHoverFeatures from 'components/productCard/CardHoverFeatures';
import { RouteBasePath } from 'constants/index';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IProductData } from 'services/product';
import { convertPrice } from 'utils/convertPrice';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  productData: IProductData;
  isShowCardFeatureHover?: boolean;
}

const ProductCard: React.FC<IProps> = ({ productData, isShowCardFeatureHover = true }) => {
  const productDetailPath = useMemo(() => {
    return `/${RouteBasePath.CLIENT_PRODUCT_PAGE_BASE_PATH}/${productData.category.categorySlug}/${productData.productId}`;
  }, [productData]);

  return (
    <div className='w-full group'>
      <div className='w-full relative'>
        <ImageResponsive
          width={340}
          height={340}
          className='text-white'
          imageProps={{
            src: imageLinkGeneration(productData.images[0].storageName, productData.images[0].imageName),
            alt: `${productData.productName}`
          }}
        />
        {isShowCardFeatureHover ? (
          <CardHoverFeatures className='group-hover:flex' viewDetailPath={productDetailPath} productData={productData} />
        ) : (
          <></>
        )}
      </div>
      <div className='w-full py-2 px-4 text-center space-y-1'>
        <h2 className='font-playfair-display capitalize text-inherit truncate italic font-normal text-2xl'>
          <Link to={productDetailPath} className='hover:text-link-hover'>
            {productData.productName}
          </Link>
        </h2>
        <p className='text-pewter-blue font-medium'>{convertPrice(productData.productQuantityDtoList[0].price)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
