import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { getAllStoreLocatorThunk } from 'redux/storeLocatorManage/getAllStoreLocatorSlice';
import { removeStoreService } from 'services/storeLocatorManage';

interface IProps {
  storeId: number;
  storeName: string;
}

const RemoveStoreButton: React.FC<IProps> = ({ storeId, storeName }) => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isRemovingStore, setIsRemovingStore] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  const handleRemoveStore = useCallback(async () => {
    setIsRemovingStore(true);
    try {
      const response = await removeStoreService(storeId);

      if (response) {
        toast.success('Store is removed.');

        dispatch(getAllStoreLocatorThunk());

        handleCloseModal();
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsRemovingStore(false);
    }
  }, [storeId]);

  return (
    <>
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        {SvgIcons.Trash}
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title='Delete product'>
        <div className='w-full space-y-6'>
          <h6 className='text-lg font-medium text-center'>
            You are going to delete store locator name <span className='font-bold'>{storeName}</span>. Are you sure you want to delete?
          </h6>
          <div className='w-full flex justify-center items-center space-x-2'>
            <ButtonComp disabled={isRemovingStore} className='flex-1' onClick={handleCloseModal}>
              Cancel
            </ButtonComp>
            <ButtonComp loading={isRemovingStore} isPrimary={false} className='flex-1' onClick={handleRemoveStore}>
              Ok
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default RemoveStoreButton;
