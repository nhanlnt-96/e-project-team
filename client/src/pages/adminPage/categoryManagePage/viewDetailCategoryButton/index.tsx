import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import CategoryDetailForm from 'pages/adminPage/categoryManagePage/viewDetailCategoryButton/CategoryDetailForm';
import React, { useState } from 'react';
import { ICategoryData } from 'services/category';

interface IProps {
  categoryData: ICategoryData;
}

const ViewDetailCategoryButton: React.FC<IProps> = ({ categoryData }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  return (
    <>
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        {SvgIcons.EyeIcon}
      </ButtonComp>
      <ModalComp onPressOk={handleCloseModal} onCloseModal={handleCloseModal} isOpenModal={isShowModal} title={categoryData.categoryName}>
        <CategoryDetailForm categoryData={categoryData} />
      </ModalComp>
    </>
  );
};

export default ViewDetailCategoryButton;
