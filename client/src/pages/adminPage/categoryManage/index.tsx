import Title from 'components/title';
import CategoryListing from 'pages/adminPage/categoryManage/categoryListing';
import CreateNewCategoryButton from 'pages/adminPage/categoryManage/createNewCategoryButton';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import React from 'react';

const CategoryManage = () => {
    return (
        <SectionContainer>
            <Title title={'Category listing'} titleClassName='text-black' rootClassName='border-b border-black pb-2'/>
            <div className='w-ful flex justify-end items-center'>
                <CreateNewCategoryButton/>
            </div>
            <CategoryListing/>
        </SectionContainer>
    );
};

export default CategoryManage;