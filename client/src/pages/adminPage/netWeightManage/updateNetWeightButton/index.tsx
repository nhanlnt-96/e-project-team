import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import NetWeightForm from 'pages/adminPage/netWeightManage/netWeightForm';
import { INetWeightFormikValue } from 'pages/adminPage/netWeightManage/netWeightForm/useNetWeightFormik';
import React, { useCallback, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { getAllNetWeightThunk } from 'redux/netWeightManage/getAllNetWeightSlice';
import { INetWeightData, IUpdateNetWeightData, updateNetWeightService } from 'services/netWeight';

interface IProps {
  netWeightData: INetWeightData;
}

const UpdateNetWeightButton: React.FC<IProps> = ({ netWeightData }) => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const handleOpenModal = () => setIsShowModal(true);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleUpdateNetWeight = useCallback(
    async (values: INetWeightFormikValue) => {
      setIsUpdating(true);
      try {
        const updateData: IUpdateNetWeightData = {
          netWeightId: netWeightData.netWeightId
        };
        if (values.netWeightLabel != netWeightData.netWeightLabel) updateData.netWeightLabel = values.netWeightLabel;
        if (values.netWeightValue != netWeightData.netWeightValue) updateData.netWeightValue = values.netWeightValue;
        const response = await updateNetWeightService(updateData);
        if (response) {
          dispatch(getAllNetWeightThunk());

          handleCloseModal();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsUpdating(false);
      }
    },
    [netWeightData]
  );

  return (
    <>
      <ButtonComp isPrimary={true} className='!px-4' onClick={handleOpenModal}>
        {SvgIcons.PencilSquare}
      </ButtonComp>
      <ModalComp
        onCloseModal={handleCloseModal}
        isOpenModal={isShowModal}
        title={`Update net weight: ${netWeightData.netWeightLabel}`}
        destroyOnClose
      >
        <NetWeightForm onSubmit={handleUpdateNetWeight} netWeightData={netWeightData} isLoading={isUpdating} />
      </ModalComp>
    </>
  );
};

export default UpdateNetWeightButton;
