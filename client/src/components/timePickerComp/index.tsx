import './TimePickerComp.scss';

import { TimePicker, TimePickerProps } from 'antd';
import React, { useLayoutEffect, useRef } from 'react';

interface IProps extends TimePickerProps {}

export const TIME_PICKER_FORMAT = 'h:mm a';

const TimePickerComp: React.FC<IProps> = ({ ...props }) => {
  const timePickerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleSetTimePickerPopup = () => {
      if (timePickerRef?.current) {
        const rootStyle = document.querySelector(':root');
        const timePickerContainerWidth = timePickerRef.current.offsetWidth;
        if (rootStyle) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          rootStyle.style.setProperty('--time-picker-dropdown-width', `${timePickerContainerWidth}px`);
        }
      }
    };

    document.addEventListener('resize', handleSetTimePickerPopup);

    handleSetTimePickerPopup();

    return () => document.addEventListener('resize', handleSetTimePickerPopup);
  }, [timePickerRef]);

  return (
    <div ref={timePickerRef} className='w-full'>
      <TimePicker {...props} use12Hours format={TIME_PICKER_FORMAT} className='time-picker-comp' popupClassName='time-picker-comp__dropdown' />
    </div>
  );
};

export default TimePickerComp;
