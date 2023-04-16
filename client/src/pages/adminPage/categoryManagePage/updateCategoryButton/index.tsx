import { message } from 'antd';
import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import CategoryForm from 'pages/adminPage/categoryManagePage/categoryForm';
import { ICategoryFormikValues } from 'pages/adminPage/categoryManagePage/categoryForm/useCategoryFormik';
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
    } finally {
      setIsUpdatingCategory(false);
    }
  };

  return (
    <>
      {contextHolder}
      <ButtonComp isPrimary={true} className='!px-4' onClick={handleOpenModal}>
        {SvgIcons.PencilSquare}
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title={`Update category: ${categoryData.categoryName}`} destroyOnClose>
        <CategoryForm isLoading={isUpdatingCategory} onSubmit={handleUpdateCategory} categoryData={categoryData} />
      </ModalComp>
      {isUpdatingCategory ? <Loading isLoadingMask={true} /> : <></>}
    </>
  );
};

export default UpdateCategoryButton;
