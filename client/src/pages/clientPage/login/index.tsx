import ButtonComp from 'components/buttonComp';
import Container from 'components/container';
import LoginForm from 'pages/clientPage/login/LoginForm';
import React from 'react';

const Login = () => {
    return (
        <div className='w-full min-h-screen bg-black flex justify-center items-center'>
            <Container className='grid grid-cols-1 gap-y-5 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-5'>
                <div className='bg-white w-full text-black p-5 space-y-4 lg:space-y-6'>
                    <div className='py-2 border-b border-black/50'>
                        <h2 className='font-playfair-display font-medium text-2xl capitalize sm:text-3xl'>Login</h2>
                    </div>
                    <div className='w-full'>
                        <h6 className='uppercase font-medium mb-4 sm:text-lg'>PLEASE ENTER YOUR EMAIL ADDRESS AND
                            PASSWORD</h6>
                        <LoginForm/>
                    </div>
                </div>
                <div className='bg-white w-full text-black p-5 flex flex-col space-y-4 lg:space-y-6'>
                    <div className='py-2 border-b border-black/50'>
                        <h2 className='font-playfair-display font-medium text-2xl capitalize sm:text-3xl'>create new
                            account</h2>
                    </div>
                    <div className='w-full'>
                        <p className='text-lg'>Save your shipping and billing addresses, past orders and access your
                            favourites at your convenience.</p>
                    </div>
                    <div className='mt-8 lg:!mt-auto ml-auto'>
                        <ButtonComp isPrimary={false}>Register</ButtonComp>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Login;