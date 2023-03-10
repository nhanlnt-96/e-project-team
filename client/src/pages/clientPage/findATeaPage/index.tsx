import PageContainer from 'components/pageContainer';
import Title from 'components/title';
import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {getAllCategoryService, ICategoryData} from 'services/category';

const FindATeaPage = () => {
    const [categoryData, setCategoryData] = useState<ICategoryData[]>([]);

    useEffect(() => {
        (async () => {
            const fetchCategoryResponse = await getAllCategoryService();
            if (fetchCategoryResponse.length) setCategoryData(fetchCategoryResponse);
        })();
    }, []);

    return (
        <PageContainer pageContainerClassName='space-y-4 md:space-y-6'>
            <Title title='Find a tea' subtitle='Find the perfect tea blend.'/>
            <div className='w-full grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
                {categoryData.map((category) => (
                    <div key={category.categoryId} className='bg-white space-y-2.5 px-1.5'>
                        <div className='py-4'>
                            <NavLink
                                to={`/shop/${category.categorySlug}`}
                                className='uppercase text-black  font-semibold text-lg after:bg-black sm:text-xl nav-link__hover'
                            >
                                {category.categoryName}
                            </NavLink>
                        </div>
                    </div>
                ))}
            </div>
        </PageContainer>
    );
};

export default FindATeaPage;