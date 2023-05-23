import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import NewsForm from 'pages/adminPage/newsManagePage/newsForm';
import { INewsFormikValue } from 'pages/adminPage/newsManagePage/newsForm/useNewsFormik';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { getAllNewsThunk } from 'redux/newsManage/getAllNewsSlice';
import { INewsData, IUpdateNews, updateNewsService } from 'services/news';

interface IProps {
  newsData: INewsData;
}

const UpdateNewsButton: React.FC<IProps> = ({ newsData }) => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const handleOpenModal = () => setIsShowModal(true);

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const handleUpdateNews = useCallback(
    async (values: INewsFormikValue) => {
      const updateData: IUpdateNews = {
        newsId: newsData.newsId
      };
      if (values.newsTitle !== newsData.newsTitle) updateData.newsTitle = values.newsTitle;
      if (values.newsBody !== newsData.newsBody) updateData.newsBody = values.newsBody;
      if (values.newsCoverImgFile) updateData.newsCoverImgFile = values.newsCoverImgFile;
      try {
        const response = await updateNewsService(updateData);
        if (response) {
          toast.success('News  is updated.');

          dispatch(getAllNewsThunk());

          handleCloseModal();
        }
      } catch (error) {
        toast.error(error as string);
      }
    },
    [newsData.newsId]
  );

  return (
    <>
      <ButtonComp isPrimary={true} className='!px-4' onClick={handleOpenModal}>
        {SvgIcons.PencilSquare}
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title={`Update news: ${newsData.newsTitle}`} destroyOnClose>
        <NewsForm onSubmit={handleUpdateNews} newsData={newsData} isLoading={isUpdating} />
      </ModalComp>
    </>
  );
};

export default UpdateNewsButton;
