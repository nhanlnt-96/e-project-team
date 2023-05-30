import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import NewsDetailForm from 'pages/adminPage/newsManagePage/viewNewsDetailButton/NewsDetailForm';
import React, { useState } from 'react';
import { INewsData } from 'services/news';

interface IProp {
  newsData: INewsData;
}

const ViewNewsDetailButton: React.FC<IProp> = ({ newsData }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  return (
    <>
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        {SvgIcons.EyeIcon}
      </ButtonComp>
      <ModalComp onPressOk={handleCloseModal} onCloseModal={handleCloseModal} isOpenModal={isShowModal} title={`News: ${newsData.newsTitle}`}>
        <NewsDetailForm newsData={newsData} />
      </ModalComp>
    </>
  );
};

export default ViewNewsDetailButton;
