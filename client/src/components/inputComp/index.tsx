import './InputComp.scss';

import { Input, InputProps } from 'antd';
import React, { useMemo } from 'react';

interface IProps extends InputProps {
  className?: string;
}

const InputComp: React.FC<IProps> = ({ className = '', ...props }) => {
  const inputClassName = useMemo(() => {
    return `rounded-none border-black py-1.5 px-3 focus:border-black focus:shadow-none hover:border-black placeholder:uppercase input-comp ${className}`;
  }, [className]);

  return props.type === 'password' ? (
    <Input.Password {...props} rootClassName={inputClassName} />
  ) : (
    <Input {...props} rootClassName={inputClassName} />
  );
};

export default InputComp;