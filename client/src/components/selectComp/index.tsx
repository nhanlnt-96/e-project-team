import './SelectComp.scss';

import { Select, SelectProps } from 'antd';
import { InputStatus } from 'antd/es/_util/statusUtils';
import React from 'react';

export interface ISelectCompProps extends SelectProps {
  status?: InputStatus;
}

const SelectComp: React.FC<ISelectCompProps> = ({ status, ...props }) => {
  return (
    <div className='w-full select-comp'>
      <Select {...props} className={`select-comp__container select-comp-status__${status}`} />
    </div>
  );
};

export default SelectComp;
