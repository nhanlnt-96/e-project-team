import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import Title from 'components/title';
import { useFormik } from 'formik';
import { handleDisplayErrorMsg } from 'helpers/formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getResetPasswordMailService } from 'services/authenticate';
import * as Yup from 'yup';

interface IProps {
  isOpenModal: boolean;
  onCloseModal: () => void;
}

const EnterEmailModal: React.FC<IProps> = ({ isOpenModal, onCloseModal }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGetSuccess, setIsGetSuccess] = useState<boolean>(false);

  const initialValues: { email: string } = {
    email: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().trim().email('Email invalid').required('Please enter your email')
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await getResetPasswordMailService(values.email);
        if (response) {
          setIsGetSuccess(true);
        }
      } catch (error) {
        toast.error(error as string);
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleCloseModal = () => {
    formik.resetForm();

    setIsGetSuccess(false);

    onCloseModal();
  };

  return (
    <>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isOpenModal} title={isGetSuccess ? '' : 'Forgot password'} destroyOnClose={true}>
        <div className='w-full flex flex-col justify-center items-center space-y-6'>
          {isGetSuccess ? React.cloneElement(SvgIcons.CheckCircle, { className: 'text-green mx-auto w-10 h-10 sm:w-20 sm:h-20' }) : <></>}
          <Title
            variant='h6'
            title={isGetSuccess ? 'Sent email successfully!' : ''}
            subtitle={
              isGetSuccess
                ? 'A verification link has been sent to your email account. Please click on the link that has just been sent to your email account to verify your email.'
                : 'Enter your email and we will  send you instructions on how to reset your password'
            }
            titleClassName='text-black'
            subTitleClassName='text-black'
            rootClassName='space-y-4'
          />
          {!isGetSuccess ? (
            <form onSubmit={formik.handleSubmit} className='form-control'>
              <div className='form-item form-item__required'>
                <label htmlFor='email'>Email address</label>
                <InputComp id='email' name='email' value={formik.values.email} onChange={formik.handleChange} />
                {handleDisplayErrorMsg<{ email: string }>(formik, 'email')}
              </div>
              <div className='w-full flex justify-center items-center flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0'>
                <ButtonComp onClick={handleCloseModal}>Cancel</ButtonComp>
                {!isGetSuccess ? (
                  <ButtonComp loading={isLoading} htmlType='submit' isPrimary={false}>
                    Send
                  </ButtonComp>
                ) : (
                  <></>
                )}
              </div>
            </form>
          ) : (
            <ButtonComp onClick={handleCloseModal}>OK</ButtonComp>
          )}
        </div>
      </ModalComp>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default EnterEmailModal;
