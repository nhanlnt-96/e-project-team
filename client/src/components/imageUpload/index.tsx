import ButtonComp from 'components/buttonComp';
import FileUpload, { IFileUploadProps } from 'components/fileUpload';
import ImageResponsive from 'components/imageResponsive';
import SwiperComp from 'components/swiperComp';
import _ from 'lodash';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { fileToDataUri } from 'utils/fileToDataUri';

interface IProps extends IFileUploadProps {
  imageUrl?: string[];
  onRemoveImage?: (fileIndex?: number) => void;
}

const ImageUpload: React.FC<IProps> = ({ imageUrl, onRemoveImage, ...props }) => {
  const [imageUri, setImageUri] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState<boolean>(false);

  useEffect(() => {
    if (imageUrl?.length) {
      setIsPreview(true);

      setImageUri(imageUrl as string[]);
    }
  }, []);

  const handleConvertFileToUri = async (file: FileList) => {
    const uriString: string[] = [];
    for (const fileItem of Array.from(file)) {
      const uriResponse = await fileToDataUri(fileItem);

      uriString.push(uriResponse as string);
    }

    setImageUri(uriString);
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(event);

      await handleConvertFileToUri(event.currentTarget.files as FileList);
      if (isPreview) handleTurnOffPreviewMode();
    }
  };

  const handleRemoveImage = (uri: string) => {
    const uriTemp = _.clone(imageUri);
    const uriIndex = uriTemp.indexOf(uri);

    uriTemp.splice(uriIndex, 1);

    setImageUri(uriTemp);
    if (onRemoveImage) onRemoveImage(uriIndex);
    if (imageUri.length) {
      setImageUri(imageUrl as string[]);

      setIsPreview(true);
    }
  };
  const handleTurnOffPreviewMode = () => setIsPreview(false);

  return (
    <div className='w-full space-y-4'>
      <FileUpload {...props} onChange={handleUploadImage} />
      {imageUri.length ? (
        <SwiperComp navigation={true} spaceBetween={20} slidesPerView={imageUri.length === 1 ? 1 : 2}>
          {imageUri.map((uri) => (
            <SwiperSlide key={uri} className='relative w-full'>
              {!isPreview ? (
                <ButtonComp className='!px-2 !py-2 absolute right-0 z-10 hover:bg-antd-status-error' onClick={() => handleRemoveImage(uri)}>
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
              ) : (
                <></>
              )}
              <ImageResponsive
                width={472}
                height={168}
                imageProps={{
                  src: uri,
                  alt: 'image-preview',
                  imageClassName: '!object-contain'
                }}
              />
            </SwiperSlide>
          ))}
        </SwiperComp>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageUpload;
