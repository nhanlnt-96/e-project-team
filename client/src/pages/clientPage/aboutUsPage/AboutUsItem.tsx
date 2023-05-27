import Divider from 'components/divider';
import ImageResponsive from 'components/imageResponsive';
import Title from 'components/title';
import { ScreenBreakPoints } from 'constants/index';
import { useWindowSize } from 'hooks/useWindowSize';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { INewsData } from 'services/news';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  aboutUsContent: INewsData;
}

const AboutUsItem: React.FC<IProps> = ({ aboutUsContent }) => {
  const { width } = useWindowSize();
  const [isTruncate, setIsTruncate] = useState<boolean>(true);

  const handleReadMoreReadLess = useCallback(() => {
    setIsTruncate(!isTruncate);
  }, [isTruncate]);

  return (
    <div className='about-us-page__item'>
      <div className='w-full text-white lg:w-1/2'>
        <Title subtitle={aboutUsContent.newsTitle} subTitleClassName='font-medium text-xl md:text-2xl md:text-left' />
        <Divider className='max-w-[100px] w-full !border-white mx-auto md:mx-0' />
        <div
          className='about-us-page__item-content'
          dangerouslySetInnerHTML={{
            __html: isTruncate
              ? _.truncate(aboutUsContent.newsBody, {
                  length: width <= ScreenBreakPoints.MD_BREAKPOINT ? 400 : 1200,
                  separator: ''
                })
              : aboutUsContent.newsBody
          }}
        ></div>
        <div className='flex justify-end items-center'>
          <button
            className='outline-none uppercase underline mt-4 ml-auto text-sm spacing-4 transition duration-100 ease-in-out focus:ring-0 hover:no-underline about-us-page__item-btn'
            onClick={handleReadMoreReadLess}
          >
            {isTruncate ? 'Read More' : 'Read Less'}
          </button>
        </div>
      </div>
      <div className='w-full lg:w-1/2'>
        <ImageResponsive
          width={604}
          height={456}
          imageProps={{
            src: imageLinkGeneration(aboutUsContent.newsCoverImg, ''),
            alt: aboutUsContent.newsTitle
          }}
        />
      </div>
    </div>
  );
};

export default AboutUsItem;
