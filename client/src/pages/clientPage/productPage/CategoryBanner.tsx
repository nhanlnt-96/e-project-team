import SEO from 'components/seo';
import Title from 'components/title';
import { useGetCurrentUrl } from 'hooks/useGetCurrentUrl';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { categoryDataSelector } from 'redux/categoryManage/selector';
import { useAppSelector } from 'redux/hooks';
import { getCategoryBySlugService, ICategoryData } from 'services/category';

const CategoryBanner: React.FC = () => {
  const { categorySlug } = useParams();
  const { categoryData } = useAppSelector(categoryDataSelector);
  const pageUrl = useGetCurrentUrl();
  const [categoryDetailData, setCategoryDetailData] = useState<ICategoryData | null>(null);

  useEffect(() => {
    if (categoryData.length) {
      setCategoryDetailData(categoryData.find((category) => category.categorySlug === categorySlug) as ICategoryData);
    } else {
      getCategoryBySlugService(categorySlug!).then((response) => {
        setCategoryDetailData(response);
      });
    }
  }, [categoryData, categorySlug]);

  return categoryDetailData ? (
    <>
      <SEO title={`TWG Tea | ${categoryDetailData.categoryName}`} description={categoryDetailData.categoryName} url={pageUrl} />
      <div className='max-w-4xl w-full mx-auto border-b border-taupe-gray pb-2'>
        <Title title={categoryDetailData.categoryName} subtitle={categoryDetailData.categoryDescription} subTitleClassName='text-taupe-gray' />
      </div>
    </>
  ) : (
    <></>
  );
};

export default CategoryBanner;
