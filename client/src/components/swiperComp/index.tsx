import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './SwiperComp.scss';

import React from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperProps } from 'swiper/react';

interface IProps extends SwiperProps {
  children: string[] | JSX.Element[];
}

const SwiperComp: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <div className={`${props.navigation ? 'px-4 scale-100' : ''} swiper-comp`}>
      <Swiper {...props} modules={[Navigation, Pagination]} className='swiper-comp__container'>
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperComp;
