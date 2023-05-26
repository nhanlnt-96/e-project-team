import PageContainer from 'components/pageContainer';
import React, { useCallback } from 'react';

const Footer: React.FC = () => {
  const handleScrollBackToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className='w-full bg-black border-t border-white/70'>
      <PageContainer pageContainerClassName='flex items-center flex-col-reverse lg:space-y-0 lg:flex-row lg:justify-between'>
        <p className='text-white text-center mt-4 lg:mt-0 lg:text-left'>
          TWG Tea Company Pte Ltd. Copyright & Trademark Notices &copy; 2023. All Rights Reserved.
        </p>
        <button
          className='outline-none space-x-2 text-white flex justify-center items-center font-light focus:ring-0'
          onClick={handleScrollBackToTop}
        >
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M12 3.07056L11.4608 3.58581L5.08575 9.96081L6.165 11.0401L11.25 5.95356V21.0001H12.75V5.95281L17.8358 11.0393L18.9143 9.96081L12.5393 3.58581L12 3.07056Z'
              fill='currentColor'
            />
          </svg>
          <span>Back to top</span>
        </button>
      </PageContainer>
    </footer>
  );
};

export default Footer;
