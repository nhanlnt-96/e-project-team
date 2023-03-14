import ImageResponsive from 'components/imageResponsive';
import InputComp from 'components/inputComp';
import _ from 'lodash';
import React from 'react';
import { ICategoryData } from 'services/category';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  categoryData: ICategoryData;
}

const ReviewFields: React.FC<IProps> = ({ categoryData }) => {
  return (
    <>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryName'>Category Id</label>
        <InputComp disabled type='text' id='categoryName' value={_.get(categoryData, 'categoryId', '')} />
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryName'>Category Slug</label>
        <InputComp disabled type='text' id='categoryName' value={_.get(categoryData, 'categorySlug', '')} />
      </div>
      <div className='w-full space-y-2'>
        <label htmlFor='categoryName'>Category Image</label>
        <div className='w-full'>
          <ImageResponsive
            width={400}
            height={250}
            imageProps={{
              src: imageLinkGeneration(categoryData.storageName, categoryData.categoryImageName),
              alt: categoryData.categoryName
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ReviewFields;