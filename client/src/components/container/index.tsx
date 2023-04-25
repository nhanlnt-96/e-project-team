import React, { ComponentPropsWithoutRef, useMemo } from 'react';

export interface IProps extends ComponentPropsWithoutRef<'div'> {
  children: string | JSX.Element | JSX.Element[];
  isWideScreen?: boolean;
  className?: string;
}

const Container: React.FC<IProps> = ({ children, isWideScreen = false, className = '', ...props }) => {
  const containerClassName = useMemo(() => {
    return isWideScreen ? '3xl:container 3xl:mx-auto' : 'container mx-auto px-4 xl:px-5';
  }, [isWideScreen]);

  return (
    <div {...props} className={`${containerClassName} ${className}`}>
      {children}
    </div>
  );
};

export default Container;