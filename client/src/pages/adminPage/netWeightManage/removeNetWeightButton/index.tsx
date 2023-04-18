import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { getAllNetWeightThunk } from 'redux/netWeightManage/getAllNetWeightSlice';
import { removeNetWeightService } from 'services/netWeight';

interface IProps {
  netWeightId: number;
  netWeightLabel: string;
}

const RemoveNetWeightButton: React.FC<IProps> = ({ netWeightLabel, netWeightId }) => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isRemovingNetWeight, setIsRemovingNetWeight] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  const handleRemoveNetWeight = useCallback(async () => {
    setIsRemovingNetWeight(true);
    try {
      const response = await removeNetWeightService(netWeightId);
      if (response) {
        toast.success('Net weight is removed.');

        dispatch(getAllNetWeightThunk());

        handleCloseModal();
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsRemovingNetWeight(false);
    }
  }, [netWeightId]);

  return (
    <>
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        {SvgIcons.Trash}
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title='Delete net weight'>
        <div className='w-full space-y-6'>
          <h6 className='text-lg font-medium text-center'>
            You are going to delete net weight <span className='font-bold'>{netWeightLabel}</span>. Are you sure you want to delete?
          </h6>
          <div className='w-full flex justify-center items-center space-x-2'>
            <ButtonComp disabled={isRemovingNetWeight} className='flex-1' onClick={handleCloseModal}>
              Cancel
            </ButtonComp>
            <ButtonComp loading={isRemovingNetWeight} isPrimary={false} className='flex-1' onClick={handleRemoveNetWeight}>
              Ok
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default RemoveNetWeightButton;
