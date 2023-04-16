import { message } from 'antd';
import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import React, { useCallback, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { getAllProductThunk } from 'redux/productManage/getAllProductSlice';
import { removeProductService } from 'services/product';

interface IProps {
  productId: number;
  productName: string;
}

const RemoveProductButton: React.FC<IProps> = ({ productId, productName }) => {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isRemovingProduct, setIsRemovingProduct] = useState<boolean>(false);
  const handleCloseModal = () => setIsShowModal(false);

  const handleRemoveProduct = useCallback(async () => {
    setIsRemovingProduct(true);
    try {
      const response = await removeProductService(productId);

      if (response) {
        messageApi.open({
          type: 'success',
          content: 'Removed product'
        });

        dispatch(getAllProductThunk());

        handleCloseModal();
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error as string
      });
    } finally {
      setIsRemovingProduct(false);
    }
  }, [productId]);

  return (
    <>
      {contextHolder}
      <ButtonComp className='!px-4' onClick={() => setIsShowModal(true)}>
        {SvgIcons.Trash}
      </ButtonComp>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isShowModal} title='Delete product'>
        <div className='w-full space-y-6'>
          <h6 className='text-lg font-medium text-center'>
            You are going to delete product <span className='font-bold'>{productName}</span>. Are you sure you want to delete?
          </h6>
          <div className='w-full flex justify-center items-center space-x-2'>
            <ButtonComp disabled={isRemovingProduct} className='flex-1' onClick={handleCloseModal}>
              Cancel
            </ButtonComp>
            <ButtonComp loading={isRemovingProduct} isPrimary={false} className='flex-1' onClick={handleRemoveProduct}>
              Ok
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default RemoveProductButton;
