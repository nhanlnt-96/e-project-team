import React, { ComponentPropsWithoutRef, ElementType } from 'react';

interface IProps extends ComponentPropsWithoutRef<ElementType> {
  variant?: ElementType;
  title: string | JSX.Element | JSX.Element[];
  subtitle?: string | JSX.Element | JSX.Element[];
  rootClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}

const Title: React.FC<IProps> = ({
  title,
  subtitle = '',
  variant: TitleTag = 'h2',
  rootClassName = '',
  titleClassName = '',
  subTitleClassName = '',
  ...props
}) => {
  return (
    <div className={`w-full space-y-2 text-white text-center ${rootClassName}`}>
      <TitleTag {...props} className={`font-playfair-display italic font-normal capitalize text-3xl md:text-4xl ${titleClassName || ''}`}>
        {title}
      </TitleTag>
      {subtitle ? <div className={`font-light sm:text-lg ${subTitleClassName}`} dangerouslySetInnerHTML={{ __html: subtitle as string }} /> : <></>}
    </div>
  );
};

export default Title;
