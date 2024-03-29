import Loading from 'components/loading';
import ProductCard from 'components/productCard';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByCategorySlugService,IProductData } from 'services/product';

const ProductListing: React.FC = () => {
  const { categorySlug } = useParams();
  const [productData, setProductData] = useState<IProductData[]>([]);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);

  useEffect(() => {
    getProductByCategorySlugService(categorySlug as string)
      .then((response) => setProductData(response))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsFetchingData(false);
      });
  }, []);

  return !isFetchingData ? (
    productData.length ? (
      <div className='w-full grid grid-cols-1 justify-center items-center text-white gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {productData.map((product) => (
          <ProductCard key={product.productId} productData={product} />
        ))}
      </div>
    ) : (
      <p className='text-white text-center'>No product to show</p>
    )
  ) : (
    <Loading isLoadingMask />
  );
};

export default ProductListing;
