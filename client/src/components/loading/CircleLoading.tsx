import React from 'react';

interface IProps {
  className?: string;
}

const CircleLoading: React.FC<IProps> = ({ className = '' }) => {
  return (
    <div className={`lds-roller ${className}`}>
      <div className='lds-roller__wrapper'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default CircleLoading;
