import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import Loading from 'components/loading';
import { PASSWORD_REGEX, RouteBasePath } from 'constants/index';
import { useFormik } from 'formik';
import { handleDisplayErrorMsg } from 'helpers/formik';
import { useEffectOnce } from 'hooks/useEffectOnce';
import ResetPasswordSuccessModal from 'pages/authenticate/resetPassword/ResetPasswordSuccessModal';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IResetPasswordDate, resetPasswordService } from 'services/authenticate';
import { checkTokenExistService } from 'services/token';
import * as Yup from 'yup';

interface IResetPasswordValues {
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const initialValues: IResetPasswordValues = {
    password: '',
    confirmPassword: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      password: Yup.string()
        .trim()
        .required('Please enter your password')
        .matches(
          PASSWORD_REGEX,
          'Password must have: at least 8 characters, maximum 30 characters; at least one uppercase; at least one number; no special character. Please try again'
        ),
      confirmPassword: Yup.string()
        .trim()
        .required('Please enter confirm password')
        .oneOf([Yup.ref('password')], 'Password confirmation does not match')
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const resetPasswordData: IResetPasswordDate = {
          token: token as string,
          password: values.password,
          confirmPassword: values.confirmPassword
        };
        const response = await resetPasswordService(resetPasswordData);
        if (response) setIsOpenModal(true);
      } catch (error) {
        toast.error(error as string);
      } finally {
        setIsLoading(false);
      }
    }
  });

  useEffectOnce(() => {
    checkTokenExistService(token as string)
      .then((response) => {
        if (!response) navigate(RouteBasePath.PAGE_NOT_FOUND);
      })
      .catch(() => navigate(RouteBasePath.PAGE_NOT_FOUND))
      .finally(() => setIsCheckingToken(false));
  });

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return !isCheckingToken ? (
    <>
      <div className='py-2 border-b border-black/50'>
        <h2 className='font-playfair-display font-medium text-2xl capitalize sm:text-3xl'>Reset password</h2>
      </div>
      <div className='w-full'>
        <h6 className='uppercase font-medium mb-4 sm:text-lg'>PLEASE ENTER YOUR NEW PASSWORD</h6>
        <form onSubmit={formik.handleSubmit} className='form-control'>
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
            {handleDisplayErrorMsg<IResetPasswordValues>(formik, 'password')}
          </div>
          <div className='form-item form-item__required'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <InputComp
              type='password'
              placeholder='Confirm Password'
              id='confirmPassword'
              name='confirmPassword'
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            {handleDisplayErrorMsg<IResetPasswordValues>(formik, 'confirmPassword')}
          </div>
          <div className='w-full flex flex-col space-y-2 justify-center items-center !mt-8'>
            <ButtonComp loading={isLoading} htmlType='submit' isPrimary={false}>
              Reset password
            </ButtonComp>
          </div>
        </form>
      </div>
      {isLoading ? <Loading isLoadingMask /> : <></>}
      <ResetPasswordSuccessModal isOpen={isOpenModal} onClose={handleCloseModal} />
    </>
  ) : (
    <Loading isPageLoading />
  );
};

export default ResetPasswordPage;
