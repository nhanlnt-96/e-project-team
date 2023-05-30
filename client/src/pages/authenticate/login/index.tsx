import LoginForm from 'pages/authenticate/login/LoginForm';
import React from 'react';

const LoginPage = () => {
  return (
    <>
      <div className='py-2 border-b border-black/50'>
        <h2 className='font-playfair-display font-medium text-2xl capitalize sm:text-3xl'>Login</h2>
      </div>
      <div className='w-full'>
        <h6 className='uppercase font-medium mb-4 sm:text-lg'>PLEASE ENTER YOUR EMAIL ADDRESS AND PASSWORD</h6>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
