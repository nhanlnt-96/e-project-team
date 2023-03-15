import Title from 'components/title';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryDataSelector } from 'redux/categoryManage/selector';
import { useAppSelector } from 'redux/hooks';
import { productSearchService } from 'services/product';
import { IProductData } from 'services/product/types';

const ProductPage = () => {
  const { categorySlug } = useParams();
  const { categoryData } = useAppSelector(categoryDataSelector);
  const [productData, setProductData] = useState<IProductData[]>([]);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);

  useEffect(() => {
    productSearchService(categorySlug as string)
      .then((response) => setProductData(response))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsFetchingData(false);
      });
  }, []);

  return (
    <div className='w-full'>
      <Title title={''} />
    </div>
  );
};

export default ProductPage;
