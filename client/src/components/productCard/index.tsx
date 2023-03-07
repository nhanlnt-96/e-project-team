import ImageResponsive from 'components/imageResponsive';
import CardHoverFeatures from 'components/productCard/CardHoverFeatures';
import React from 'react';
import {Link} from 'react-router-dom';

const ProductCard: React.FC = () => {
    return (
        <div className='w-full group'>
            <div className='w-full relative'>
                <ImageResponsive
                    width={340}
                    height={340}
                    imageProps={{
                        src: 'https://twgtea.com/Files/Images/TWG-Tea/Products/detailzoom1200x900/PACKTB6033.jpg',
                        alt: '1837 Black Tea'
                    }}
                />
                <CardHoverFeatures className='group-hover:flex'/>
            </div>
            <div className='w-full py-2 px-4 text-center space-y-1'>
                <h2 className='font-playfair-display capitalize truncate italic font-normal text-2xl'>
                    <Link to={'/'} className='hover:text-link-hover'>
                        1837 black tea
                    </Link>
                </h2>
                <p className='text-pewter-blue font-medium'>$29.00</p>
            </div>
        </div>
    );
};

export default ProductCard;
