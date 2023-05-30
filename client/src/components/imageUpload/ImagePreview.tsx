import ButtonComp from 'components/buttonComp';
import ImageResponsive from 'components/imageResponsive';
import React from 'react';

interface IProps {
  uri: string;
  // eslint-disable-next-line no-unused-vars
  onRemoveImage?: (uri: string) => void;
}

const ImagePreview: React.FC<IProps> = ({ uri, onRemoveImage }) => {
  const handleRemoveImage = (uri: string) => {
    if (onRemoveImage) onRemoveImage(uri);
  };

  return (
    <div className='w-full relative'>
      {onRemoveImage ? (
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
        isPreview
        width={472}
        height={168}
        imageProps={{
          src: uri,
          alt: 'image-preview',
          imageClassName: '!object-contain'
        }}
      />
    </div>
  );
};

export default ImagePreview;
