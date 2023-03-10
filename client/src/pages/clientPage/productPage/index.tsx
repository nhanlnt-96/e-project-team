import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { categorySlug } = useParams();

  return <div className='text-white'>{categorySlug}</div>;
};

export default ProductPage;
