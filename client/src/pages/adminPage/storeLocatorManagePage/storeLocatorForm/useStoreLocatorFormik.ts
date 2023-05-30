import { PHONE_NUMBER_REGEX } from 'constants/index';
import { useFormik } from 'formik';
import _ from 'lodash';
import { IStoreLocatorData } from 'services/storeLocatorManage/types';
import * as Yup from 'yup';

export interface IStoreOpenHourFormikValues {
  index?: number;
  id?: number;
  day: string;
  fromTime: string;
  toTime: string;
}

export interface IStoreLocatorFormikValues {
  storeName: string;
  address: string;
  phoneNumber: string;
  storeOpenHours: IStoreOpenHourFormikValues[];
  storeImgFile: File | null;
}

// eslint-disable-next-line no-unused-vars
const useStoreLocatorFormik = (onSubmit: (values: IStoreLocatorFormikValues) => void, storeData?: IStoreLocatorData) => {
  const initialValues: IStoreLocatorFormikValues = {
    storeName: _.get(storeData, 'storeName', ''),
    address: _.get(storeData, 'address', ''),
    phoneNumber: _.get(storeData, 'phoneNumber', ''),
    storeOpenHours: _.get(storeData, 'storeOpenHourDtos', []),
    storeImgFile: null
  };

  return useFormik<IStoreLocatorFormikValues>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      storeName: Yup.string().trim().required('Please enter store name'),
      address: Yup.string().trim().required('Please enter store address'),
      phoneNumber: Yup.string().trim().required('Please enter phone number').matches(PHONE_NUMBER_REGEX, 'Phone number invalid. Please try again'),
      storeOpenHours: Yup.lazy(() => {
        if (storeData?.storeOpenHourDtos.length) {
          return Yup.array(
            Yup.object().shape({
              id: Yup.number(),
              day: Yup.string(),
              fromTime: Yup.string(),
              toTime: Yup.string()
            })
          ).notRequired();
        }

        return Yup.array(
          Yup.object().shape({
            index: Yup.number(),
            day: Yup.string(),
            fromTime: Yup.string(),
            toTime: Yup.string()
          })
        ).min(1, 'Open hour must have at least 1 record.');
      }),
      storeImgFile: Yup.lazy(() => {
        if (storeData?.storeImage) {
          return Yup.mixed().notRequired();
        }

        return Yup.mixed().required('Store cover is required.');
      })
    }),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });
};

export default useStoreLocatorFormik;
