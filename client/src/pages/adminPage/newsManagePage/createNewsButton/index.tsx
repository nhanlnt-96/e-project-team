import ButtonComp from 'components/buttonComp';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import NewsForm from 'pages/adminPage/newsManagePage/newsForm';
import { INewsFormikValue } from 'pages/adminPage/newsManagePage/newsForm/useNewsFormik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { getAllNewsThunk } from 'redux/newsManage/getAllNewsSlice';
import { createNewsService, ICreateNews } from 'services/news';

const CreateNewsButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleOpenModal = () => setIsShowModal(true);
  const handleCloseModal = () => setIsShowModal(false);

  const handleCreateNews = async (values: INewsFormikValue) => {
    setIsLoading(true);
    try {
      const newsData: ICreateNews = {
        newsTitle: values.newsTitle,
        newsBody: values.newsBody,
        newsCoverImgFile: values.newsCoverImgFile as File
      };
      const response = await createNewsService(newsData);
      if (response) {
        toast.success('News is created.');

        dispatch(getAllNewsThunk());

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
        Create News
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} destroyOnClose title='Create New News'>
        <NewsForm onSubmit={handleCreateNews} isLoading={isLoading} />
      </ModalComp>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default CreateNewsButton;
