import './Modal.scss';

import { Modal, ModalProps } from 'antd';
import ButtonComp from 'components/buttonComp';
import React from 'react';

interface IProps extends ModalProps {
  children: string | JSX.Element | JSX.Element[];
  isLoading?: boolean;
  onCloseModal: () => void;
  onPressOk?: () => void;
  isOpenModal: boolean;
}

const ModalComp: React.FC<IProps> = ({ children, isOpenModal, isLoading = false, onCloseModal, onPressOk, ...props }) => {
  return (
    <Modal
      {...props}
      open={isOpenModal}
      centered
      onCancel={onCloseModal}
      confirmLoading={isLoading}
      className='modal-container'
      footer={
        onPressOk
          ? [
              <ButtonComp key='ok-btn' onClick={onPressOk} isPrimary={false} htmlType='submit' className='ml-auto'>
                Ok
              </ButtonComp>
            ]
          : null
      }
    >
      <div className='py-4 modal-body'>{children}</div>
    </Modal>
  );
};

export default ModalComp;