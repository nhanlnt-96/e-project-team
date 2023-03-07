import Billboard from 'pages/clientPage/landingPage/components/billboard';
import React, {useEffect} from 'react';
import {getAllCategoryService} from 'services/category';

const LandingPage = () => {
    useEffect(() => {
        (async () => {
            const response = await getAllCategoryService();

            console.log(response);
        })();
    }, []);

    return (
        <div className='w-full'>
            <Billboard/>
        </div>
    );
};

export default LandingPage;
