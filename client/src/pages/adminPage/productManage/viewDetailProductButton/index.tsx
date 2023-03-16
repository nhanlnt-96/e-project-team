import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import ProductDetailForm from 'pages/adminPage/productManage/viewDetailProductButton/ProductDetailForm';
import React, { useState } from 'react';
import { IProductData } from 'services/product/types';

interface IProps {
  productData: IProductData;
}

const ViewDetailProductButton: React.FC<IProps> = ({ productData }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  return (
    <>
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        <svg
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
          ></path>
          <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'></path>
        </svg>
      </ButtonComp>
      <ModalComp onPressOk={handleCloseModal} onCloseModal={handleCloseModal} isOpenModal={isShowModal} title={productData.productName}>
        <ProductDetailForm productData={productData} />
      </ModalComp>
    </>
  );
};

export default ViewDetailProductButton;