import { FormikProps } from 'formik';
import _ from 'lodash';
import StoreOpenHourInputItem from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm/storeOpenHourInput/StoreOpenHourInputItem';
import { IStoreLocatorFormikValues, IStoreOpenHourFormikValues } from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm/useStoreLocatorFormik';
import React, { useCallback, useMemo } from 'react';
import { IStoreLocatorData } from 'services/storeLocatorManage/types';

interface IProps {
  formik: FormikProps<IStoreLocatorFormikValues>;
  storeData?: IStoreLocatorData;
}

export const MAX_DAY_PER_WEEK = 7;

const StoreOpenHourInput: React.FC<IProps> = ({ formik, storeData }) => {
  const numberOfItem = useMemo(() => {
    const storeOpenHourLength = formik.values.storeOpenHours.length;

    return storeOpenHourLength < MAX_DAY_PER_WEEK ? storeOpenHourLength + 1 : storeOpenHourLength;
  }, [formik.values.storeOpenHours]);

  const handleAddOpenHour = useCallback(
    (index: number, values: IStoreOpenHourFormikValues) => {
      const openHourTemp = _.clone(formik.values.storeOpenHours);
      const openHourExist = openHourTemp.find((item) => item.index === values.index || item.id === values.id);

      if (!openHourExist) {
        const openHourValue: IStoreOpenHourFormikValues = {
          index: index,
          day: values.day,
          fromTime: values.fromTime,
          toTime: values.toTime
        };
        if (values.id) openHourValue.id = values.id;

        openHourTemp.push(openHourValue);
      } else {
        const indexOfExistItem = openHourTemp.indexOf(openHourExist);

        openHourTemp[indexOfExistItem] = {
          ...openHourTemp[indexOfExistItem],
          day: values.day,
          fromTime: values.fromTime,
          toTime: values.toTime
        };
      }

      formik.setFieldValue('storeOpenHours', openHourTemp);
    },
    [formik.values.storeOpenHours]
  );

  return (
    <>
      {[...new Array(numberOfItem)].map((_, index) => (
        <StoreOpenHourInputItem
          defaultValue={formik.values.storeOpenHours[index]}
          key={index}
          formik={formik}
          onAddOpenHour={(values) => handleAddOpenHour(index, values)}
          itemIndex={index}
          isHasStoreData={Boolean(storeData)}
        />
      ))}
    </>
  );
};

export default StoreOpenHourInput;
