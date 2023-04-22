import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import { removeProductQuantitySelector } from 'redux/productManage/selector';

interface IProps {
  disabled: boolean;
  onRemoveProductQuantity: () => void;
}

const RemoveProductQuantityButton: React.FC<IProps> = ({ disabled, onRemoveProductQuantity }) => {
  const { error, isSuccess, isRemoving } = useAppSelector(removeProductQuantitySelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleCloseModal = () => setIsOpen(false);

  useEffect(() => {
    if (error || isSuccess) handleCloseModal();
  }, [error, isSuccess]);

  return (
    <>
      <div className='space-y-2 flex flex-col justify-center items-center w-fit'>
        <label className='text-sm text-taupe-gray invisible'>Remove</label>
        <button
          type='button'
          className='text-antd-status-error h-[38px] hover:text-antd-status-error/50'
          disabled={disabled}
          onClick={() => setIsOpen(true)}
        >
          {SvgIcons.Trash}
        </button>
      </div>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isOpen} title='Remove product quantity'>
        <div className='w-full space-y-6'>
          <h6 className='text-lg font-medium text-center'>You are going to delete product quantity. Are you sure you want to delete?</h6>
          <div className='w-full flex justify-center items-center space-x-2'>
            <ButtonComp disabled={isRemoving} className='flex-1' onClick={handleCloseModal}>
              Cancel
            </ButtonComp>
            <ButtonComp loading={isRemoving} isPrimary={false} className='flex-1' onClick={onRemoveProductQuantity}>
              Ok
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default RemoveProductQuantityButton;
