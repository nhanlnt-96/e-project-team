// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './SwiperComponent.scss';

import React from 'react';
import {Swiper, SwiperProps} from 'swiper/react';

interface IProps extends SwiperProps {
    rootClassName?: string;
}

const SwiperComponent: React.FC<IProps> = ({rootClassName = '', ...props}) => {
    return (
        <div className={`w-full scale-100 ${rootClassName}`}>
            <Swiper {...props} className='swiper-comp__container'>
                {props.children}
            </Swiper>
        </div>
    );
};

export default SwiperComponent;
