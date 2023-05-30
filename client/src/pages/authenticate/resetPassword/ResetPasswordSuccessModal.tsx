import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import Title from 'components/title';
import { RouteBasePath } from 'constants/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordSuccessModal: React.FC<IProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleCloseModal = () => {
    onClose();

    navigate('/');
  };

  const handleGoToLoginPage = () => {
    onClose();

    navigate(RouteBasePath.LOGIN_BASE_PATH);
  };

  return (
    <ModalComp onCloseModal={handleCloseModal} isOpenModal={isOpen}>
      <div className='w-full flex flex-col justify-center items-center space-y-6'>
        {React.cloneElement(SvgIcons.CheckCircle, { className: 'text-green mx-auto w-10 h-10 sm:w-20 sm:h-20' })}
        <Title
          variant='h6'
          title='Password reset successful'
          subtitle='Awesome, you have successfully updated your password.'
          titleClassName='text-black'
          subTitleClassName='text-black'
        />
        <div className='w-full flex justify-center items-center flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0'>
          <ButtonComp onClick={handleCloseModal} className='w-full'>
            Go to Homepage
          </ButtonComp>
          <ButtonComp isPrimary={false} className='w-full' onClick={handleGoToLoginPage}>
            Go to Login
          </ButtonComp>
        </div>
      </div>
    </ModalComp>
  );
};

export default ResetPasswordSuccessModal;
