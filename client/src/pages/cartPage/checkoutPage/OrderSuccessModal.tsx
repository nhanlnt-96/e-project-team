import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import Title from 'components/title';
import React from 'react';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  receiverName: string;
}

const OrderSuccessModal: React.FC<IProps> = ({ isOpen, onClose, receiverName }) => {
  return (
    <>
      <ModalComp onCloseModal={onClose} isOpenModal={isOpen}>
        <div className='w-full flex flex-col justify-center items-center space-y-6'>
          {React.cloneElement(SvgIcons.CheckCircle, { className: 'text-green mx-auto w-10 h-10 sm:w-20 sm:h-20' })}
          <Title
            variant='h6'
            title={`Hi ${receiverName}!`}
            subtitle='Congratulations, your order has been placed.'
            titleClassName='text-black'
            subTitleClassName='text-black'
          />
          <div className='w-full flex justify-center items-center flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0'>
            <ButtonComp onClick={onClose} className='w-full'>
              OK
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default OrderSuccessModal;
