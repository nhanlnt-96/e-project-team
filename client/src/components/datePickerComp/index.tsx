import './DatePickerComp.scss';

import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd/es/date-picker';
import React from 'react';

const DatePickerComp: React.FC<DatePickerProps> = ({ ...props }) => {
  return <DatePicker {...props} autoComplete='off' className='w-full rounded-none border-black py-1.5 px-3 hover:border-black date-picker-comp' />;
};

export default DatePickerComp;
