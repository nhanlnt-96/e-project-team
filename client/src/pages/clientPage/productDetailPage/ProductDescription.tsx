import './ProductDetailPage.scss';

import React from 'react';

interface IProps {
  description: string;
}

const ProductDescription: React.FC<IProps> = ({ description }) => {
  return <div className='w-full text-white product-description' dangerouslySetInnerHTML={{ __html: description }}></div>;
};

export default ProductDescription;
