import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import Title from 'components/title';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerSelector } from 'redux/authenticate/selector';
import { useAppSelector } from 'redux/hooks';

interface IProps {
  userPassword: string;
}

const RegisterSuccessModal: React.FC<IProps> = ({ userPassword }) => {
  const navigate = useNavigate();
  const { registeredData } = useAppSelector(registerSelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (registeredData) setIsOpen(true);
  }, [registeredData]);

  const handleCloseModal = () => {
    navigate('/');

    setIsOpen(false);
  };

  return (
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
          <ButtonComp isPrimary={false} className='w-full'>
            Login to my account
          </ButtonComp>
        </div>
      </div>
    </ModalComp>
  );
};

export default RegisterSuccessModal;
