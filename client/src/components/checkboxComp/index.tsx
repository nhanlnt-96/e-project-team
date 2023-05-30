import './CheckboxComp.scss';

import { Checkbox, CheckboxProps } from 'antd';
import React from 'react';

interface IProps extends CheckboxProps {}

const CheckboxComp: React.FC<IProps> = ({ ...props }) => {
  return <Checkbox {...props} className='checkbox-comp' />;
};

export default CheckboxComp;
