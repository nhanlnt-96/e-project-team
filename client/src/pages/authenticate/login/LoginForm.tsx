import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import {RouteBasePath} from 'constants/index';
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
        <Link to={'/'} className='block underline w-fit'>
          Forgot your password?
        </Link>
      </div>
      <div className='w-full flex flex-col space-y-2 justify-center items-center !mt-8'>
        <ButtonComp htmlType='submit' isPrimary={false}>
          Sign in
        </ButtonComp>
        <p>Do not have an account? <Link to={RouteBasePath.REGISTER_PAGE_BASE_PATH} className='font-medium hover:link-hover'>Register</Link></p>
      </div>
    </form>
  );
};

export default LoginForm;
