import ButtonComp from 'components/buttonComp';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import CategoryForm from 'pages/adminPage/categoryManagePage/categoryForm';
import { ICategoryFormikValues } from 'pages/adminPage/categoryManagePage/categoryForm/useCategoryFormik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getAllCategoryThunk } from 'redux/categoryManage/getAllCategorySlice';
import { useAppDispatch } from 'redux/hooks';
import { createCategoryService } from 'services/category';

const CreateNewCategoryButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState<boolean>(false);
  const handleOpenModal = () => setIsShowModal(true);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleCreateNewCategory = async (values: ICategoryFormikValues) => {
    setIsCreatingCategory(true);
    try {
      const response = await createCategoryService(values);

      if (response) {
        toast.success('Category is created.');

        dispatch(getAllCategoryThunk());

        handleCloseModal();
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsCreatingCategory(false);
    }
  };

  return (
    <>
      <ButtonComp onClick={handleOpenModal} isPrimary={false}>
        Create new category
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title='Create new category' destroyOnClose>
        <CategoryForm isLoading={isCreatingCategory} onSubmit={handleCreateNewCategory} />
      </ModalComp>
      {isCreatingCategory ? <Loading isLoadingMask={true} /> : <></>}
    </>
  );
};

export default CreateNewCategoryButton;
