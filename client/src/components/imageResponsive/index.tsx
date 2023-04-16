import './ImageResponsive.scss';

import { Image } from 'antd';
import Loading from 'components/loading';
import React, { ComponentPropsWithoutRef, useMemo, useState } from 'react';

interface IImageProps extends ComponentPropsWithoutRef<'img'> {
  imageClassName?: string;
}

interface IProps extends ComponentPropsWithoutRef<'div'> {
  width: number;
  height: number;
  className?: string;
  imageProps: IImageProps;
  isPreview?: boolean;
}

const PLACEHOLDER_IMAGE_BASE_URL = 'https://placehold.co';

const ImageResponsive: React.FC<IProps> = ({
  width,
  height,
  className = '',
  imageProps: { imageClassName, ...imageProps },
  isPreview = false,
  ...props
}) => {
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(true);
  const [imagePlaceholderUrl, setImagePlaceholderUrl] = useState<string | null>(null);

  const paddingBottom = useMemo(() => {
    return (height / width) * 100;
  }, [width, height]);

  const imageSrcProp = useMemo(() => {
    return imageProps.src?.includes('data:image/') ? imageProps.src : `${imageProps.src}?lastmod=${new Date().getTime()}`;
  }, [imageProps.src]);

  const handleLoadImageError = () => {
    setIsLoadingImage(false);

    setImagePlaceholderUrl(`${PLACEHOLDER_IMAGE_BASE_URL}/${width}x${height}?text=Load+Image+Fail+:(`);
  };

  return (
    <div {...props} style={{ paddingBottom: `${paddingBottom}%` }} className={`w-full relative ${className} image-responsive`}>
      {isPreview ? (
        <Image src={imagePlaceholderUrl ?? imageSrcProp} alt={imageProps.alt} className={`object-cover ${imageClassName || ''}`} />
      ) : (
        <>
          {isLoadingImage ? (
            <div className='w-full h-full absolute left-0 top-0 flex justify-center items-center'>
              <Loading />
            </div>
          ) : (
            <></>
          )}
          <img
            {...imageProps}
            src={imagePlaceholderUrl ?? imageSrcProp}
            alt={imageProps.alt}
            onLoad={() => setIsLoadingImage(false)}
            onError={handleLoadImageError}
            className={`w-full h-full absolute left-0 top-0 object-cover ${imageClassName || ''}`}
          />
        </>
      )}
    </div>
  );
};

export default ImageResponsive;
