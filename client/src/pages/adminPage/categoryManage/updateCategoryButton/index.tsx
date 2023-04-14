import { message } from 'antd';
import ButtonComp from 'components/buttonComp';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import CategoryForm from 'pages/adminPage/categoryManage/categoryForm';
import { ICategoryFormikValues } from 'pages/adminPage/categoryManage/categoryForm/useCategoryFormik';
import React, { useState } from 'react';
import { getAllCategoryThunk } from 'redux/categoryManage/getAllCategorySlice';
import { useAppDispatch } from 'redux/hooks';
import { ICategoryData, IUpdateCategoryData, updateCategoryService } from 'services/category';

interface IProps {
  categoryData: ICategoryData;
}

const UpdateCategoryButton: React.FC<IProps> = ({ categoryData }) => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isUpdatingCategory, setIsUpdatingCategory] = useState<boolean>(false);

  const handleOpenModal = () => setIsShowModal(true);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleUpdateCategory = async (values: ICategoryFormikValues) => {
    setIsUpdatingCategory(true);
    try {
      const updateData: IUpdateCategoryData = {
        categoryId: categoryData.categoryId
      };
      if (values.categoryName !== categoryData.categoryName) updateData.categoryName = values.categoryName;
      if (values.categoryDescription !== categoryData.categoryDescription) updateData.categoryDescription = values.categoryDescription;
      if (values.categoryImage) updateData.categoryImage = values.categoryImage;
      const response = await updateCategoryService(updateData);

      if (response) {
        messageApi.open({
          type: 'success',
          content: 'Category is updated.'
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

    setIsUpdatingCategory(false);
  };

  return (
    <>
      {contextHolder}
      <ButtonComp isPrimary={true} className='!px-4' onClick={handleOpenModal}>
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
            d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
          ></path>
        </svg>
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title={`Update category: ${categoryData.categoryName}`} destroyOnClose>
        <CategoryForm isLoading={isUpdatingCategory} onSubmit={handleUpdateCategory} categoryData={categoryData} />
      </ModalComp>
      {isUpdatingCategory ? <Loading isLoadingMask={true} /> : <></>}
    </>
  );
};

export default UpdateCategoryButton;
