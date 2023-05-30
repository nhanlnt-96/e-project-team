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
      {productData.productQuantityDtoList.length ? (
        <div className='w-full flex flex-col justify-center space-y-2'>
          <p className='text-gray-500 shrink-0'>Product Quantity and Price</p>
          <table className='table-auto border-collapse border border-black'>
            <thead>
              <tr>
                <th className='border border-black'>Quantity Id</th>
                <th className='border border-black'>Net Weight</th>
                <th className='border border-black'>Quantity</th>
                <th className='border border-black'>Price</th>
              </tr>
            </thead>
            <tbody>
              {productData.productQuantityDtoList.map((quantity) => (
                <tr key={quantity.quantityId}>
                  <td className='border border-black text-center'>{quantity.quantityId}</td>
                  <td className='border border-black text-center'>{quantity.netWeightDto?.netWeightLabel}</td>
                  <td className='border border-black text-center'>{quantity.quantity}</td>
                  <td className='border border-black text-center'>{convertPrice(quantity.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
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
          <SwiperComp navigation={true}>
            {productData.images.map((image) => (
              <SwiperSlide key={image.imageName} className='w-full'>
                <ImageResponsive
                  isPreview
                  width={472}
                  height={168}
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
