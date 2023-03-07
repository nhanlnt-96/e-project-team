import ButtonComp from 'components/buttonComp';
import SwiperComponent from 'components/swiperComponent';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getAllCategoryService, ICategoryData} from 'services/category';
import {Navigation} from 'swiper';
import {SwiperSlide} from 'swiper/react';

const CategorySwiper: React.FC = () => {
    const [categoryData, setCategoryData] = useState<ICategoryData[]>([]);

    useEffect(() => {
        (async () => {
            const fetchCategoryResponse = await getAllCategoryService();
            if (fetchCategoryResponse.length) setCategoryData(fetchCategoryResponse);
        })();
    }, []);

    return (
        <div className='w-full mt-6'>
            <SwiperComponent
                spaceBetween={18}
                breakpoints={{
                    640: {slidesPerView: 'auto', spaceBetween: 20},
                    1024: {slidesPerView: 'auto', spaceBetween: 30}
                }}
                navigation={true}
                modules={[Navigation]}
                rootClassName='px-6'
            >
                {categoryData.map((category: ICategoryData) => (
                    <SwiperSlide key={category.categoryId} className='sm:!w-fit'>
                        <ButtonComp className='w-full'>
                            <Link to='/'>{category.categoryName}</Link>
                        </ButtonComp>
                    </SwiperSlide>
                ))}
            </SwiperComponent>
        </div>
    );
};

export default CategorySwiper;