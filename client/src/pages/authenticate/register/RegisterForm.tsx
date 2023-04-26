import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import React from 'react';
import { Link } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  return (
    <form className='space-y-4 sm:space-y-6'>
      <InputComp type='text' placeholder='full name *' />
      <InputComp type='text' placeholder='username *' />
      <InputComp type='password' placeholder='password *' />
      <div className='w-full flex flex-col space-y-2 justify-center items-center !mt-8'>
        <ButtonComp isPrimary={false}>Register</ButtonComp>
        <p>
          Already have an account?{' '}
          <Link to='..' relative='path' className='font-medium hover:link-hover'>
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
