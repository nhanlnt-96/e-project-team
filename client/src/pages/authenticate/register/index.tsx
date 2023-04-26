import RegisterForm from 'pages/authenticate/register/RegisterForm';
import React from 'react';

const RegisterPage = () => {
  return (
    <>
      <div className='py-2 border-b border-black/50'>
        <h2 className='font-playfair-display font-medium text-2xl capitalize sm:text-3xl'>create new account</h2>
      </div>
      <div className='w-full'>
        <p className='sm:text-lg mb-4'>Save your shipping and billing addresses, past orders and access your favourites at your convenience.</p>
        <RegisterForm />
      </div>
    </>
  );
};

export default RegisterPage;
