import AddToCartButton from 'components/productCard/AddToCartButton';
import AddToFavoriteButton from 'components/productCard/AddToFavoriteButton';
import React, { ComponentPropsWithoutRef, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProductData } from 'services/product';

interface IFeatureButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: ReactElement;
  label: string;
  pagePath?: string;
}

interface IProps {
  className?: string;
  viewDetailPath: string;
  productData: IProductData;
}

export const FeatureButton: React.FC<IFeatureButtonProps> = ({ icon, label, ...props }) => {
  return (
    <button
      {...props}
      className='flex flex-col justify-center items-center space-y-2 transition duration-200 ease-in-out font-playfair-display hover:text-link-hover'
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const CardHoverFeatures: React.FC<IProps> = ({ viewDetailPath, className = '', productData }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`hidden justify-center items-center absolute w-full h-full left-0 top-0 bg-black/50 text-white p-2 transition duration-200 ease-in-out gap-5 ${className}`}
    >
      <FeatureButton
        icon={
          <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' className='w-8 h-8'>
            <path
              clipRule='evenodd'
              fillRule='evenodd'
              d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z'
            ></path>
          </svg>
        }
        label='View details'
        onClick={() => navigate(viewDetailPath)}
      />
      <AddToCartButton productData={productData} />
      <AddToFavoriteButton productId={productData.productId} />
    </div>
  );
};

export default CardHoverFeatures;
