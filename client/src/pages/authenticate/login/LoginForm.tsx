import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import Loading from 'components/loading';
import { RouteBasePath } from 'constants/index';
import { useFormik } from 'formik';
import { handleDisplayErrorMsg } from 'helpers/formik';
import EnterEmailModal from 'pages/authenticate/login/EnterEmailModal';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginThunk } from 'redux/authenticate/loginSlice';
import { getAuthSelector, loginSelector } from 'redux/authenticate/selector';
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
  const { isLoading } = useAppSelector(loginSelector);
  const { userData } = useAppSelector(getAuthSelector);
  const [isOpenEnterEmailModal, setIsOpenEnterEmailModal] = useState<boolean>(false);

  useEffect(() => {
    if (userData) {
      const redirectFrom = location.state?.from;
      if (redirectFrom) navigate(redirectFrom);
      else navigate('/');
    }
  }, [userData]);

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
          <p className='block underline w-fit cursor-pointer hover:no-underline' onClick={() => setIsOpenEnterEmailModal(true)}>
            Forgot your password?
          </p>
        </div>
        <div className='w-full flex flex-col space-y-2 justify-center items-center !mt-8'>
          <ButtonComp htmlType='submit' isPrimary={false} loading={isLoading}>
            Sign in
          </ButtonComp>
          <p>
            Do not have an account?{' '}
            <Link to={RouteBasePath.REGISTER_PAGE_BASE_PATH} state={{ from: location.state?.from || '/' }} className='font-medium hover:link-hover'>
              Register
            </Link>
          </p>
        </div>
      </form>
      {isLoading ? <Loading isLoadingMask /> : <></>}
      <EnterEmailModal isOpenModal={isOpenEnterEmailModal} onCloseModal={() => setIsOpenEnterEmailModal(false)} />
    </>
  );
};

export default LoginForm;
