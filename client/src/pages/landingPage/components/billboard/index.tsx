import BillboardImage from 'assets/images/billboard-image.png';
import ButtonComp from 'components/buttonComp';
import React from 'react';

const Billboard: React.FC = () => {
    return (
        <div className='w-screen h-screen relative'>
            <div className='w-full relative pb-ratio-768-1024 lg:pb-ratio-1920-898'>
                <img src={BillboardImage} alt='wing-tea-billboard'
                     className='w-full h-full absolute left-0 top-0 object-cover lg:object-contain'/>
                <div
                    className='absolute w-full h-full left-0 top-0 flex flex-col justify-center items-center space-y-5 sm:space-y-6 lg:space-y-10'>
                    <h1 className='flex flex-col justify-center items-center text-white text-3xl capitalize space-y-4 sm:text-4xl lg:text-5xl xl:text-6xl'>
                        <span className='font-light'>Make your tea time</span>
                        <span className='font-playfair-display italic'>best with only wing tea</span>
                    </h1>
                    <ButtonComp>Shop now</ButtonComp>
                </div>
            </div>
        </div>
    );
};

export default Billboard;
