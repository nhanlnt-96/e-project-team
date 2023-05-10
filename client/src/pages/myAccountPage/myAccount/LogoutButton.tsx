import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import React, { useState } from 'react';
import { logout } from 'redux/authenticate/getAuthSlice';
import { useAppDispatch } from 'redux/hooks';

const LogoutButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCloseModal = () => setIsOpen(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className='flex justify-end items-center'>
        <ButtonComp isPrimary={false} onClick={() => setIsOpen(true)}>
          Logout
        </ButtonComp>
      </div>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isOpen} title='Logout'>
        <div className='w-full space-y-6'>
          <h6 className='text-lg font-medium text-center'>You are going to logout. Are you sure you want to logout?</h6>
          <div className='w-full flex justify-center items-center space-x-2'>
            <ButtonComp className='flex-1' onClick={handleCloseModal}>
              Cancel
            </ButtonComp>
            <ButtonComp isPrimary={false} className='flex-1' onClick={handleLogout}>
              Ok
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default LogoutButton;
