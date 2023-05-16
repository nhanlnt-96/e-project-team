import { Spin } from 'antd';
import ProductCard from 'components/productCard';
import { useEffectOnce } from 'hooks/useEffectOnce';
import React, { useState } from 'react';
import { generateProductDataObject } from 'redux/productManage/utils';
import { getUserProductFavoriteService } from 'services/accountManage';
import { IProductData } from 'services/product';

interface IProps {
  userId: number;
}

const ProductFavorite: React.FC<IProps> = ({ userId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productFavoriteData, setProductFavoriteData] = useState<IProductData[]>([]);

  useEffectOnce(() => {
    setIsLoading(true);

    (async () => {
      try {
        const response = await getUserProductFavoriteService(userId);
        if (response && response.productDtoList.length) {
          const productFavData: IProductData[] = [];
          for (const product of response.productDtoList) {
            productFavData.push(generateProductDataObject(product));
          }

          setProductFavoriteData(productFavData);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  });

  return !isLoading ? (
    <>
      {productFavoriteData.length ? (
        <div className='w-full grid grid-cols-1 justify-center items-center text-black gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {productFavoriteData.map((product) => (
            <ProductCard key={product.productId} productData={product} isShowCardFeatureHover={false} />
          ))}
        </div>
      ) : (
        <p className='text-center p-4'>No have product to display</p>
      )}
    </>
  ) : (
    <div className='w-full flex justify-center items-center p-4'>
      <Spin size='default' className='spin-black' />
    </div>
  );
};

export default ProductFavorite;
