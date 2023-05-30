import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import Title from 'components/title';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginThunk } from 'redux/authenticate/loginSlice';
import { loginSelector, registerSelector } from 'redux/authenticate/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ILoginData } from 'services/authenticate/loginService';

interface IProps {
  userPassword: string;
}

const RegisterSuccessModal: React.FC<IProps> = ({ userPassword }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { registeredData } = useAppSelector(registerSelector);
  const { isLoading, isLogged } = useAppSelector(loginSelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (registeredData) setIsOpen(true);
  }, [registeredData]);

  useEffect(() => {
    if (isLogged) {
      const redirectFrom = location.state?.from;
      if (redirectFrom) navigate(redirectFrom);
      else navigate('/');
    }
  }, [isLogged]);

  const handleCloseModal = () => {
    navigate('/');

    setIsOpen(false);
  };

  const handleLogin = useCallback(() => {
    if (registeredData) {
      const loginData: ILoginData = {
        email: registeredData.email,
        password: userPassword
      };

      dispatch(loginThunk(loginData));
    }
  }, [registeredData, userPassword]);

  return (
    <>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isOpen}>
        <div className='w-full flex flex-col justify-center items-center space-y-6'>
          {React.cloneElement(SvgIcons.CheckCircle, { className: 'text-green mx-auto w-10 h-10 sm:w-20 sm:h-20' })}
          <Title
            variant='h6'
            title={`Hi ${registeredData?.fullName}!`}
            subtitle='Congratulations, your account has been successfully created.'
            titleClassName='text-black'
            subTitleClassName='text-black'
          />
          <div className='w-full flex justify-center items-center flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0'>
            <ButtonComp onClick={handleCloseModal} className='w-full'>
              Go to Homepage
            </ButtonComp>
            <ButtonComp isPrimary={false} className='w-full' onClick={handleLogin}>
              Login to my account
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default RegisterSuccessModal;
