import ImageResponsive from 'components/imageResponsive';
import React from 'react';
import { ICategoryData } from 'services/category';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  categoryData: ICategoryData;
}

const CategoryDetailForm: React.FC<IProps> = ({ categoryData }) => {
  return (
    <div className='w-full space-y-4'>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>Category Id</p>
        <p className='text-right'>{categoryData.categoryId}</p>
      </div>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>Category Name</p>
        <p className='text-right'>{categoryData.categoryName}</p>
      </div>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>Category Slug</p>
        <p className='text-right'>{categoryData.categorySlug}</p>
      </div>
      <div className='w-full flex flex-col space-y-2'>
        <p className='text-gray-500 shrink-0'>Category Image</p>
        <ImageResponsive
          width={472}
          height={168}
          imageProps={{
            src: imageLinkGeneration(categoryData.storageName, categoryData.categoryImageName),
            alt: 'image-preview',
            imageClassName: '!object-contain'
          }}
        />
      </div>
    </div>
  );
};

export default CategoryDetailForm;