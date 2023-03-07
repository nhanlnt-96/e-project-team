import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import { useFormik } from 'formik';
import React from 'react';
import { Link } from 'react-router-dom';

interface IFormikValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const initialValues: IFormikValues = {
    username: '',
    password: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className='space-y-4 sm:space-y-6'>
      <InputComp type='text' placeholder='username *' />
      <div className='w-full space-y-1'>
        <InputComp type='password' placeholder='password *' />
        <Link to={'/'} className='block underline w-fit'>Forgot your password?</Link>
      </div>
      <div className='w-full flex justify-between items-center !mt-8'>
        <div></div>
        <ButtonComp htmlType='submit' isPrimary={false}>
          Sign in
        </ButtonComp>
      </div>
    </form>
  );
};

export default LoginForm;
