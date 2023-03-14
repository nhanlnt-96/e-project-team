import React, { FC } from 'react';

interface IProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

const SectionContainer: FC<IProps> = ({ children, className = '' }) => {
  return <div className={`w-full space-y-8 ${className}`}>{children}</div>;
};

export default SectionContainer;