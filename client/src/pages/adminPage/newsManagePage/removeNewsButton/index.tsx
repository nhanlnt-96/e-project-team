import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { getAllNewsThunk } from 'redux/newsManage/getAllNewsSlice';
import { removeNewsService } from 'services/news';

interface IProps {
  newsTitle: string;
  newsId: number;
}

const RemoveNewsButton: React.FC<IProps> = ({ newsTitle, newsId }) => {
  const dispatch = useAppDispatch();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isRemovingNews, setIsRemovingNews] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  const handleRemoveNews = useCallback(async () => {
    setIsRemovingNews(true);
    try {
      const response = await removeNewsService(newsId);
      if (response) {
        toast.success('News is removed.');

        dispatch(getAllNewsThunk());

        handleCloseModal();
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsRemovingNews(false);
    }
  }, [newsId]);

  return (
    <>
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        {SvgIcons.Trash}
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title='Delete net weight'>
        <div className='w-full space-y-6'>
          <h6 className='text-lg font-medium text-center'>
            You are going to delete news <span className='font-bold'>{newsTitle}</span>. Are you sure you want to delete?
          </h6>
          <div className='w-full flex justify-center items-center space-x-2'>
            <ButtonComp disabled={isRemovingNews} className='flex-1' onClick={handleCloseModal}>
              Cancel
            </ButtonComp>
            <ButtonComp loading={isRemovingNews} isPrimary={false} className='flex-1' onClick={handleRemoveNews}>
              Ok
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default RemoveNewsButton;
