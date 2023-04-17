import { AllowNumber } from 'constants/index';
import { useFormik } from 'formik';
import _ from 'lodash';
import { INetWeightData } from 'services/netWeight';
import * as Yup from 'yup';

export interface INetWeightFormikValue {
  netWeightLabel: string;
  netWeightValue: number;
}

// eslint-disable-next-line no-unused-vars
const useNetWeightFormik = (onSubmit: (values: INetWeightFormikValue) => void, netWeightData?: INetWeightData) => {
  const initialValues: INetWeightFormikValue = {
    netWeightLabel: _.get(netWeightData, 'netWeightLabel', ''),
    netWeightValue: _.get(netWeightData, 'netWeightValue', 0)
  };

  return useFormik<INetWeightFormikValue>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      netWeightLabel: Yup.string().required('Net weight label can not be null.'),
      netWeightValue: Yup.number()
        .min(AllowNumber.MIN_NET_WEIGHT_VALUE, `Net weight value can not be smaller than ${AllowNumber.MIN_NET_WEIGHT_VALUE}.`)
        .typeError('Net weight value must a number.')
    }),
    onSubmit: (values) => onSubmit(values)
  });
};

export default useNetWeightFormik;
