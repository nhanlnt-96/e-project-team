import React from 'react';

interface IProps {
  className?: string;
}

const Divider: React.FC<IProps> = ({ className = '', ...props }) => {
  return <div {...props} className={`w-full my-8 border-b border-white/40 ${className}`}></div>;
};

export default Divider;
