import ImageResponsive from 'components/imageResponsive';
import { RouteBasePath } from 'constants/index';
import React, { useCallback, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAllCategoryThunk } from 'redux/categoryManage/getAllCategorySlice';
import { categoryDataSelector } from 'redux/categoryManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

const CategoryListing: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryData } = useAppSelector(categoryDataSelector);

  useEffect(() => {
    if (!categoryData.length) dispatch(getAllCategoryThunk());
  }, []);

  const handleGenerateCategoryUrl = useCallback((categorySlug: string) => {
    return `/${RouteBasePath.CLIENT_PRODUCT_PAGE_BASE_PATH}/${categorySlug}`;
  }, []);

  return (
    <div className='w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
      {categoryData.map((category) => (
        <div
          key={category.categoryId}
          className='bg-white cursor-pointer group'
          onClick={() => navigate(handleGenerateCategoryUrl(category.categorySlug))}
        >
          <div className='w-full'>
            <ImageResponsive
              width={400}
              height={250}
              imageProps={{
                src: imageLinkGeneration(category.storageName, category.categoryImageName),
                alt: category.categoryName
              }}
            />
          </div>
          <div className='w-full px-2 py-2 sm:py-4'>
            <NavLink
              title={category.categoryName}
              to={handleGenerateCategoryUrl(category.categorySlug)}
              className='uppercase w-full block text-black font-semibold text-lg truncate group-hover:after:w-full after:bg-black sm:text-xl nav-link__hover'
            >
              {category.categoryName}
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryListing;
