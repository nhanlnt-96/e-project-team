import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import Title from 'components/title';
import React from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const GetEmailVerifySuccess: React.FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <ModalComp onCloseModal={onClose} isOpenModal={isOpen}>
      <div className='w-full flex flex-col justify-center items-center space-y-6'>
        {React.cloneElement(SvgIcons.CheckCircle, { className: 'text-green mx-auto w-10 h-10 sm:w-20 sm:h-20' })}
        <Title
          variant='h6'
          title={'Sent email successfully!'}
          subtitle='A verification link has been sent to your email account. Please click on the link that has just been sent to your email account to verify your email.'
          titleClassName='text-black'
          subTitleClassName='text-black'
          rootClassName='space-y-4'
        />
        <div className='w-full flex justify-center items-center'>
          <ButtonComp isPrimary={false} onClick={onClose}>
            OK
          </ButtonComp>
        </div>
      </div>
    </ModalComp>
  );
};

export default GetEmailVerifySuccess;
