import ButtonComp from 'components/buttonComp';
import ImagePreview from 'components/imageUpload/ImagePreview';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import SwiperComp from 'components/swiperComp';
import { AllowNumber } from 'constants/index';
import { FC, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { removeProductImageThunk } from 'redux/productManage/removeProductImageSlice';
import { removeProductImageSelector } from 'redux/productManage/selector';
import { IImage } from 'services/product';
import { SwiperSlide } from 'swiper/react';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  productId: number;
  images: IImage[];
}

interface IRemoveImageModalState {
  isOpen: boolean;
  imageIndex: number;
}

const ProductImageUploaded: FC<IProps> = ({ productId, images }) => {
  const dispatch = useAppDispatch();
  const { isRemoving } = useAppSelector(removeProductImageSelector);

  const initialState: IRemoveImageModalState = {
    isOpen: false,
    imageIndex: 0
  };
  const [removeImageModal, setRemoveImageModal] = useState<IRemoveImageModalState>(initialState);
  const handleCloseModal = () => setRemoveImageModal(initialState);

  const handleOpenModal = (imageIndex: number) => {
    setRemoveImageModal({
      isOpen: true,
      imageIndex: imageIndex
    });
  };

  const handleRemoveUploadedProductImage = useCallback(
    (imageId: number) => {
      dispatch(removeProductImageThunk({ imageId, productId }));
    },
    [productId]
  );

  return (
    <>
      <div className='w-full space-y-2'>
        <label>
          Product Image Uploaded ({images.length}/{AllowNumber.MAXIMUM_ALLOW_UPLOAD_PRODUCT_IMAGE})
        </label>
        <SwiperComp navigation={true} slidesPerView={1} loop={true}>
          {images.map((image, index) => (
            <SwiperSlide key={image.imageId} className='relative w-full'>
              <ImagePreview uri={imageLinkGeneration(image.storageName, image.imageName)} onRemoveImage={() => handleOpenModal(index)} />
            </SwiperSlide>
          ))}
        </SwiperComp>
      </div>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={removeImageModal.isOpen}>
        <div className='w-full space-y-6'>
          <ImagePreview uri={imageLinkGeneration(images[removeImageModal.imageIndex].storageName, images[removeImageModal.imageIndex].imageName)} />
          <h6 className='text-lg font-medium text-center'>You are going to delete this product image. Are you sure you want to delete?</h6>
          <div className='w-full flex justify-center items-center space-x-2'>
            <ButtonComp disabled={isRemoving} className='flex-1' onClick={handleCloseModal}>
              Cancel
            </ButtonComp>
            <ButtonComp
              loading={isRemoving}
              isPrimary={false}
              className='flex-1'
              onClick={() => handleRemoveUploadedProductImage(images[removeImageModal.imageIndex].imageId)}
            >
              Ok
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
      {isRemoving ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default ProductImageUploaded;
