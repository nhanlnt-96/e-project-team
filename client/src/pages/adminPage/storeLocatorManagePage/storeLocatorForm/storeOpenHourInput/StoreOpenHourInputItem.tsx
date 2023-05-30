import ButtonComp from 'components/buttonComp';
import SelectComp from 'components/selectComp';
import TimePickerComp, { TIME_PICKER_FORMAT } from 'components/timePickerComp';
import { DayOfWeek } from 'constants/index';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { FormikProps } from 'formik';
import RemoveOpenHourButton from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm/storeOpenHourInput/RemoveOpenHourButton';
import { IStoreLocatorFormikValues, IStoreOpenHourFormikValues } from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm/useStoreLocatorFormik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { validateObject } from 'utils/validateObject';

dayjs.extend(customParseFormat);

interface IDaySelect {
  value: string;
  label: string;
  disabled: boolean;
}

interface IProps {
  defaultValue: IStoreOpenHourFormikValues;
  formik: FormikProps<IStoreLocatorFormikValues>;
  // eslint-disable-next-line no-unused-vars
  onAddOpenHour: (values: IStoreOpenHourFormikValues) => void;
  itemIndex: number;
  isHasStoreData: boolean;
}

const StoreOpenHourInputItem: React.FC<IProps> = ({ formik, onAddOpenHour, itemIndex, isHasStoreData, defaultValue }) => {
  const initialOpenHourState = {
    day: '',
    toTime: '',
    fromTime: ''
  };
  const [isDisableFields, setIsDisableFields] = useState<boolean>(false);

  const [openHour, setOpenHour] = useState<IStoreOpenHourFormikValues>(initialOpenHourState);

  useEffect(() => {
    if (!defaultValue) {
      setOpenHour(initialOpenHourState);

      setIsDisableFields(false);
    } else {
      setIsDisableFields(true);

      setOpenHour({
        day: defaultValue.day,
        fromTime: defaultValue.fromTime,
        toTime: defaultValue.toTime
      });
    }
  }, [defaultValue]);

  const daySelect = useMemo(() => {
    const daysArray: IDaySelect[] = [];
    for (const key of Object.keys(DayOfWeek)) {
      if (Number(key) >= 0) {
        const dayString = DayOfWeek[key as unknown as number];

        daysArray.push({
          value: dayString,
          label: dayString,
          disabled: Boolean(formik.values.storeOpenHours.find((item) => item.day === dayString))
        });
      }
    }

    return daysArray;
  }, [formik.values.storeOpenHours]);

  const handleChangeOpenHour = (id: string, value: string) => {
    setOpenHour((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleAddOrEditOpenTime = useCallback(() => {
    setIsDisableFields(true);
    if (itemIndex) openHour.index = itemIndex;
    if (defaultValue) openHour.id = defaultValue.id;

    onAddOpenHour(openHour);
  }, [openHour]);

  return (
    <div className='w-full flex space-x-4'>
      <RemoveOpenHourButton
        isDisabled={!validateObject<Omit<IStoreOpenHourFormikValues, 'index' | 'id'>>(openHour)}
        formik={formik}
        itemIndex={itemIndex}
        isHasStoreData={isHasStoreData}
      />
      <div className='w-1/3 space-y-2'>
        <label htmlFor='day' className='text-sm text-taupe-dayg, valueray'>
          Select day
        </label>
        <SelectComp
          placeholder='Select day'
          id='day'
          options={daySelect}
          value={openHour.day || null}
          onChange={(value) => handleChangeOpenHour('day', value)}
          disabled={isDisableFields}
        />
      </div>
      <div className='w-1/3 space-y-2'>
        <label htmlFor='fromTime' className='text-sm text-taupe-gray'>
          Select from time
        </label>
        <TimePickerComp
          id='fromTime'
          name='fromTime'
          placeholder='Select from time'
          value={openHour.fromTime ? dayjs(openHour.fromTime, TIME_PICKER_FORMAT) : undefined}
          onChange={(_, timeString) => handleChangeOpenHour('fromTime', timeString)}
          disabled={isDisableFields}
        />
      </div>
      <div className='w-1/3 space-y-2'>
        <label htmlFor='toTime' className='text-sm text-taupe-gray'>
          Select to time
        </label>
        <TimePickerComp
          id='toTime'
          name='toTime'
          placeholder='Select to time'
          value={openHour.toTime ? dayjs(openHour.toTime, TIME_PICKER_FORMAT) : undefined}
          onChange={(_, timeString) => handleChangeOpenHour('toTime', timeString)}
          disabled={isDisableFields}
        />
      </div>
      {isDisableFields ? (
        <div className='space-y-2'>
          <label className='text-sm text-taupe-gray invisible'>Add</label>
          <ButtonComp className='h-[38px] !py-1.5' onClick={() => setIsDisableFields(false)}>
            Edit
          </ButtonComp>
        </div>
      ) : (
        <div className='space-y-2'>
          <label className='text-sm text-taupe-gray invisible'>Add</label>
          <ButtonComp
            className='h-[38px] !py-1.5'
            onClick={handleAddOrEditOpenTime}
            disabled={!validateObject<Omit<IStoreOpenHourFormikValues, 'index' | 'id'>>(openHour)}
          >
            {defaultValue ? 'Update' : 'Add'}
          </ButtonComp>
        </div>
      )}
    </div>
  );
};

export default StoreOpenHourInputItem;
