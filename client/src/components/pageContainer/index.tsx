import Container, { IProps } from 'components/container';
import React from 'react';

interface IPageContainerProps extends IProps {
  pageContainerClassName?: string;
}

const PageContainer: React.FC<IPageContainerProps> = ({ children, pageContainerClassName = '', ...props }) => {
  return (
    <Container {...props} className={`py-5 sm:py-6 lg:py-9 ${pageContainerClassName}`}>
      {children}
    </Container>
  );
};

export default PageContainer;
