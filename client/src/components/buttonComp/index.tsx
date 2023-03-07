import { Button, ButtonProps } from 'antd';
import React, { useMemo } from 'react';

interface IProps extends ButtonProps {
  isPrimary?: boolean;
  className?: string;
}

const ButtonComp: React.FC<IProps> = ({ isPrimary = true, className = '', ...props }) => {
  const buttonClassName = useMemo(() => {
    return isPrimary
      ? `bg-white color-black hover:!border-white hover:bg-black hover:!text-white ${className}`
      : `bg-black border-black color-white hover:!border-black hover:bg-white hover:!text-black ${className}`;
  }, [isPrimary, className]);

  return (
    <Button
      {...props}
      className={`w-fit px-[50px] py-5 rounded-none flex justify-center items-center capitalize transition duration-500 ease-in-out ${buttonClassName}`}
    />
  );
};

export default ButtonComp;