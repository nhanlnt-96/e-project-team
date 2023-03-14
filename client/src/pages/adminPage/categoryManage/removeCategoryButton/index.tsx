import { message } from 'antd';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import React, { useCallback, useState } from 'react';
import { getAllCategoryThunk } from 'redux/categoryManage/getAllCategorySlice';
import { useAppDispatch } from 'redux/hooks';
import { removeCategoryService } from 'services/category';

interface IProps {
  categoryId: number;
  categoryName: string;
}

const RemoveCategoryButton: React.FC<IProps> = ({ categoryId, categoryName }) => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isRemovingCategory, setIsRemovingCategory] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  const handleRemoveCategory = useCallback(async () => {
    setIsRemovingCategory(true);
    try {
      const response = await removeCategoryService(categoryId);

      if (response) {
        messageApi.open({
          type: 'success',
          content: response as unknown as string
        });

        dispatch(getAllCategoryThunk());

        handleCloseModal();
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error as string
      });
    }

    setIsRemovingCategory(false);
  }, [categoryId]);

  return (
    <>
      {contextHolder}
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        <svg
          fill='none'
          stroke='currentColor'
          strokeWidth='1.5'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
          ></path>
        </svg>
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