import React, { ComponentPropsWithoutRef, ReactElement, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface IFeatureButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: ReactElement;
  label: string;
  pagePath?: string;
}

interface IProps {
  className?: string;
  viewDetailPath: string;
}

const FeatureButton: React.FC<IFeatureButtonProps> = ({ icon, label, pagePath, ...props }) => {
  const navigate = useNavigate();

  const handleNavigatePage = useCallback(() => {
    navigate(pagePath as string);
  }, [pagePath]);

  return (
    <button
      {...props}
      className='flex flex-col justify-center items-center space-y-2 transition duration-200 ease-in-out hover:text-link-hover'
      onClick={handleNavigatePage}
    >
      {icon}
      <span className='text-xl'>{label}</span>
    </button>
  );
};

const CardHoverFeatures: React.FC<IProps> = ({ viewDetailPath, className = '' }) => {
  return (
    <div
      className={`hidden justify-evenly items-center absolute w-full h-full left-0 top-0 bg-black/50 text-white p-2 transition duration-200 ease-in-out ${className}`}
    >
      <FeatureButton
        icon={
          <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' className='w-10 h-10'>
            <path
              clipRule='evenodd'
              fillRule='evenodd'
              d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z'
            ></path>
          </svg>
        }
        label='View details'
        pagePath={viewDetailPath}
      />
      <FeatureButton
        icon={
          <svg fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' className='w-10 h-10'>
            <path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z'></path>
          </svg>
        }
        label='Add to cart'
      />
    </div>
  );
};

export default CardHoverFeatures;
