import ButtonComp from 'components/buttonComp';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import NetWeightForm from 'pages/adminPage/netWeightManage/netWeightForm';
import { INetWeightFormikValue } from 'pages/adminPage/netWeightManage/netWeightForm/useNetWeightFormik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { getAllNetWeightThunk } from 'redux/netWeightManage/getAllNetWeightSlice';
import { createNewNetWeightService, ICreateNetWeightData } from 'services/netWeight';

const CreateNewNetWeightButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOpenModal = () => setIsShowModal(true);
  const handleCloseModal = () => setIsShowModal(false);

  const handleCreateNewNetWeight = async (values: INetWeightFormikValue) => {
    setIsLoading(true);

    const netWeightData: ICreateNetWeightData = {
      netWeightLabel: values.netWeightLabel,
      netWeightValue: values.netWeightValue
    };
    try {
      const response = await createNewNetWeightService(netWeightData);
      if (response) {
        toast.success('Net weight is created.');

        dispatch(getAllNetWeightThunk());

        handleCloseModal();
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonComp onClick={handleOpenModal} isPrimary={false}>
        Create new net weight
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} destroyOnClose title='Create new net weight'>
        <NetWeightForm onSubmit={handleCreateNewNetWeight} isLoading={isLoading} />
      </ModalComp>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default CreateNewNetWeightButton;
