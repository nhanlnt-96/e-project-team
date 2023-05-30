import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import Title from 'components/title';
import React, { useEffect, useState } from 'react';
import { updateAccountSelector } from 'redux/authenticate/selector';
import { useAppSelector } from 'redux/hooks';

const UpdateAccountSuccess: React.FC = () => {
  const { isUpdateSuccess } = useAppSelector(updateAccountSelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isUpdateSuccess) setIsOpen(true);
  }, [isUpdateSuccess]);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <ModalComp onCloseModal={handleCloseModal} isOpenModal={isOpen}>
      <div className='w-full flex flex-col justify-center items-center space-y-6'>
        {React.cloneElement(SvgIcons.CheckCircle, { className: 'text-green mx-auto w-10 h-10 sm:w-20 sm:h-20' })}
        <Title
          variant='h6'
          title={'Update successfully!'}
          subtitle='Your profile is successfully updated.'
          titleClassName='text-black'
          subTitleClassName='text-black'
          rootClassName='space-y-4'
        />
        <div className='w-full flex justify-center items-center'>
          <ButtonComp isPrimary={false} onClick={handleCloseModal}>
            Continue
          </ButtonComp>
        </div>
      </div>
    </ModalComp>
  );
};

export default UpdateAccountSuccess;
