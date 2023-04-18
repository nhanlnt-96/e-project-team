import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllCategoryThunk } from 'redux/categoryManage/getAllCategorySlice';
import { useAppDispatch } from 'redux/hooks';
import { removeCategoryService } from 'services/category';

interface IProps {
  categoryId: number;
  categoryName: string;
}

const RemoveCategoryButton: React.FC<IProps> = ({ categoryId, categoryName }) => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isRemovingCategory, setIsRemovingCategory] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  const handleRemoveCategory = useCallback(async () => {
    setIsRemovingCategory(true);
    try {
      const response = await removeCategoryService(categoryId);

      if (response) {
        toast.success(response);

        dispatch(getAllCategoryThunk());

        handleCloseModal();
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsRemovingCategory(false);
    }
  }, [categoryId]);

  return (
    <>
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        {SvgIcons.Trash}
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title='Delete category'>
        <div className='w-full space-y-6'>
          <h6 className='text-lg font-medium text-center'>
            You are going to delete category <span className='font-bold'>{categoryName}</span>. Are you sure you want to delete?
          </h6>
          <div className='w-full flex justify-center items-center space-x-2'>
            <ButtonComp disabled={isRemovingCategory} className='flex-1' onClick={handleCloseModal}>
              Cancel
            </ButtonComp>
            <ButtonComp loading={isRemovingCategory} isPrimary={false} className='flex-1' onClick={handleRemoveCategory}>
              Ok
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default RemoveCategoryButton;
