import FileUpload, { IFileUploadProps } from 'components/fileUpload';
import ImagePreview from 'components/imageUpload/ImagePreview';
import SwiperComp from 'components/swiperComp';
import _ from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import { fileToDataUri } from 'utils/fileToDataUri';

interface IProps extends IFileUploadProps {
  // eslint-disable-next-line no-unused-vars
  onRemoveImage?: (fileIndex?: number) => void;
}

const ImageUpload: React.FC<IProps> = ({ onRemoveImage, ...props }) => {
  const [imageUri, setImageUri] = useState<string | string[]>('');

  const handleConvertFileToUri = async (files: FileList) => {
    let uriString: string | string[] = '';
    if (files.length > 1) {
      uriString = [];
      for (const fileItem of Array.from(files)) {
        const uriResponse = await fileToDataUri(fileItem);

        (uriString as unknown as string[]).push(uriResponse as string);
      }
    } else {
      uriString = (await fileToDataUri(files[0])) as string;
    }

    setImageUri(uriString);
  };

  const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    await handleConvertFileToUri(event.currentTarget.files as FileList);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  const handleRemoveSingleImage = () => {
    setImageUri('');
    if (onRemoveImage) onRemoveImage();
  };

  const handleRemoveMultiImage = (uri: string) => {
    const uriTemp = _.clone(imageUri) as string[];
    const uriIndex = uriTemp.indexOf(uri);

    uriTemp.splice(uriIndex, 1);

    setImageUri(uriTemp);
    if (onRemoveImage) onRemoveImage(uriIndex);
  };

  const handleRemoveImage = (uri: string) => {
    if (typeof imageUri === 'string') handleRemoveSingleImage();
    else handleRemoveMultiImage(uri);
  };

  return (
    <div className='w-full space-y-4'>
      <FileUpload {...props} onChange={handleUploadImage} />
      {imageUri ? (
        typeof imageUri === 'object' ? (
          <SwiperComp navigation={true} slidesPerView={1}>
            {imageUri.map((uri) => (
              <SwiperSlide key={uri} className='relative w-full'>
                <ImagePreview uri={uri} onRemoveImage={handleRemoveImage} />
              </SwiperSlide>
            ))}
          </SwiperComp>
        ) : (
          <ImagePreview uri={imageUri} onRemoveImage={handleRemoveImage} />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default ImageUpload;
