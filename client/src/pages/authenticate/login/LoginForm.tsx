import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import Loading from 'components/loading';
import { RouteBasePath } from 'constants/index';
import { useFormik } from 'formik';
import { handleDisplayErrorMsg } from 'helpers/formik';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginThunk } from 'redux/authenticate/loginSlice';
import { loginSelector } from 'redux/authenticate/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ILoginData } from 'services/authenticate/loginService';
import * as Yup from 'yup';

interface ILoginFormikValues {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, loggedData } = useAppSelector(loginSelector);

  console.log(location);

  useEffect(() => {
    if (loggedData) {
      const redirectFrom = location.state?.from;
      if (redirectFrom) navigate(redirectFrom);
      else navigate('/');
    }
  }, [loggedData]);

  const initialValues: ILoginFormikValues = {
    email: '',
    password: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().trim().email('Email invalid').required('Please enter your email'),
      password: Yup.string().trim().required('Please enter your password')
    }),
    onSubmit: (values) => {
      const loginData: ILoginData = {
        email: values.email,
        password: values.password
      };

      dispatch(loginThunk(loginData));
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='form-control'>
        <div className='form-item form-item__required'>
          <label htmlFor='email'>Email</label>
          <InputComp type='email' placeholder='Email' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} />
          {handleDisplayErrorMsg<ILoginFormikValues>(formik, 'email')}
        </div>
        <div className='form-item form-item__required'>
          <label htmlFor='password'>Password</label>
          <InputComp
            type='password'
            placeholder='Password'
            id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<ILoginFormikValues>(formik, 'password')}
          <Link to={'/'} className='block underline w-fit'>
            Forgot your password?
          </Link>
        </div>
        <div className='w-full flex flex-col space-y-2 justify-center items-center !mt-8'>
          <ButtonComp htmlType='submit' isPrimary={false} loading={isLoading}>
            Sign in
          </ButtonComp>
          <p>
            Do not have an account?{' '}
            <Link to={RouteBasePath.REGISTER_PAGE_BASE_PATH} className='font-medium hover:link-hover'>
              Register
            </Link>
          </p>
        </div>
      </form>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default LoginForm;
