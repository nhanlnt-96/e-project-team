import { Spin } from 'antd';
import React, { ComponentPropsWithoutRef, useMemo, useState } from 'react';

interface IImageProps extends ComponentPropsWithoutRef<'img'> {
  imageClassName?: string;
}

interface IProps extends ComponentPropsWithoutRef<'div'> {
  width: number;
  height: number;
  className?: string;
  imageProps: IImageProps;
}

const ImageResponsive: React.FC<IProps> = ({ width, height, className = '', imageProps: { imageClassName, ...imageProps }, ...props }) => {
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);

  const paddingBottom = useMemo(() => {
    return (height / width) * 100;
  }, [width, height]);

  return (
    <div {...props} style={{ paddingBottom: `${paddingBottom}%` }} className={`w-full relative ${className}`}>
      {isLoadingImage ? (
        <div className='w-full h-full absolute left-0 top-0 flex justify-center items-center'>
          <Spin />
        </div>
      ) : (
        <></>
      )}
      <img
        {...imageProps}
        src={imageProps.src}
        alt={imageProps.alt}
        onLoad={() => setIsLoadingImage(false)}
        className={`w-full h-full absolute left-0 top-0 object-cover ${imageClassName || ''}`}
      />
    </div>
  );
};

export default ImageResponsive;
