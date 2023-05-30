import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import ProductDetailForm from 'pages/adminPage/productManagePage/viewDetailProductButton/ProductDetailForm';
import React, { useState } from 'react';
import { IProductData } from 'services/product';

interface IProps {
  productData: IProductData;
}

const ViewDetailProductButton: React.FC<IProps> = ({ productData }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  return (
    <>
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        {SvgIcons.EyeIcon}
      </ButtonComp>
      <ModalComp onPressOk={handleCloseModal} onCloseModal={handleCloseModal} isOpenModal={isShowModal} title={productData.productName}>
        <ProductDetailForm productData={productData} />
      </ModalComp>
    </>
  );
};

export default ViewDetailProductButton;
