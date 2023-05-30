import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import DatePickerComp from 'components/datePickerComp';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useMemo } from 'react';

dayjs.extend(customParseFormat);

export const dobDateFormat = 'YYYY-MM-DD';

const DobPicker: React.FC<DatePickerProps> = ({ ...props }) => {
  const AVAILABLE_AGE_TO_REGISTER = 16;
  const currentYear = useMemo(() => dayjs().endOf('year').year(), []);

  const disabledDate: RangePickerProps['disabledDate'] = (date) => {
    return date && currentYear - date.year() < AVAILABLE_AGE_TO_REGISTER;
  };

  return (
    <DatePickerComp
      {...props}
      placeholder='Date of birth'
      format={dobDateFormat}
      defaultPickerValue={dayjs(`${currentYear - AVAILABLE_AGE_TO_REGISTER}/01/01`, dobDateFormat)}
      disabledDate={disabledDate}
    />
  );
};

export default DobPicker;
