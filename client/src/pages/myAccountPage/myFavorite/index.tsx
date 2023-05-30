import ProductCard from 'components/productCard';
import SEO from 'components/seo';
import { useGetCurrentUrl } from 'hooks/useGetCurrentUrl';
import React from 'react';
import { useAppSelector } from 'redux/hooks';
import { getProductFavoriteSelector } from 'redux/productFavorite/selector';

const MyFavorite = () => {
  const { productFavoriteData } = useAppSelector(getProductFavoriteSelector);
  const pageUrl = useGetCurrentUrl();

  return (
    <>
      <SEO title='TWG Tea | My Favorites' url={pageUrl} />
      <div className='w-full space-y-8'>
        {productFavoriteData.length ? (
          <div className='w-full grid grid-cols-1 justify-center items-center text-black gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {productFavoriteData.map((product) => (
              <ProductCard key={product.productId} productData={product} />
            ))}
          </div>
        ) : (
          <p className='text-center'>No product to show</p>
        )}
      </div>
    </>
  );
};

export default MyFavorite;
