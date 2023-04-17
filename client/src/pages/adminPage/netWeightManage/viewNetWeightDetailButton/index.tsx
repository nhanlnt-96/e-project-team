import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import NetWeightDetailForm from 'pages/adminPage/netWeightManage/viewNetWeightDetailButton/NetWeightDetailForm';
import React, { useState } from 'react';
import { INetWeightData } from 'services/netWeight';

interface IProps {
  netWeightData: INetWeightData;
}

const ViewNetWeightDetailButton: React.FC<IProps> = ({ netWeightData }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  return (
    <>
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        {SvgIcons.EyeIcon}
      </ButtonComp>
      <ModalComp
        onPressOk={handleCloseModal}
        onCloseModal={handleCloseModal}
        isOpenModal={isShowModal}
        title={`Net Weight: ${netWeightData.netWeightLabel}`}
      >
        <NetWeightDetailForm netWeightData={netWeightData} />
      </ModalComp>
    </>
  );
};

export default ViewNetWeightDetailButton;
