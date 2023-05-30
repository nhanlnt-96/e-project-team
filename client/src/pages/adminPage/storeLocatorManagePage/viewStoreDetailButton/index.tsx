import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import ProductDetailForm from 'pages/adminPage/productManagePage/viewDetailProductButton/ProductDetailForm';
import StoreDetailForm from 'pages/adminPage/storeLocatorManagePage/viewStoreDetailButton/StoreDetailForm';
import React, { useState } from 'react';
import { IStoreLocatorData } from 'services/storeLocatorManage/types';

interface IProps {
  storeData: IStoreLocatorData;
}

const ViewStoreDetailButton: React.FC<IProps> = ({ storeData }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  return (
    <>
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        {SvgIcons.EyeIcon}
      </ButtonComp>
      <ModalComp onPressOk={handleCloseModal} onCloseModal={handleCloseModal} isOpenModal={isShowModal} title={storeData.storeName}>
        <StoreDetailForm storeData={storeData} />
      </ModalComp>
    </>
  );
};

export default ViewStoreDetailButton;
