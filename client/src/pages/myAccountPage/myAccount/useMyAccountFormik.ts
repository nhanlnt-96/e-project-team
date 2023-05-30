import { FULL_NAME_REGEX, Gender, PHONE_NUMBER_REGEX } from 'constants/index';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useMemo } from 'react';
import { getAuthSelector } from 'redux/authenticate/selector';
import { useAppSelector } from 'redux/hooks';
import * as Yup from 'yup';

export interface IMyAccountFormik {
  fullName: string;
  gender: number;
  dob: Date;
  phoneNumber: string;
  addressDetail: string;
}

// eslint-disable-next-line no-unused-vars
export const useMyAccountFormik = (onSubmit: (values: IMyAccountFormik) => void) => {
  const { userData } = useAppSelector(getAuthSelector);

  const initialValues = useMemo(
    () =>
      ({
        fullName: _.get(userData, 'fullName', ''),
        gender: _.get(userData, 'gender', Gender.FEMALE),
        dob: _.get(userData, 'dob', null),
        phoneNumber: _.get(userData, 'phoneNumber', ''),
        addressDetail: _.get(userData, 'addressDetail', '')
      } as unknown as IMyAccountFormik),
    [userData]
  );

  return useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .required('Please enter your full name')
        .matches(
          FULL_NAME_REGEX,
          'Full name must have: at least 2 words; no number; no special character; uppercase at beginning; lowercase for the rest; space between two words; no space at the begin and the end. Please try again'
        ),
      phoneNumber: Yup.string().trim().required('Please enter phone number').matches(PHONE_NUMBER_REGEX, 'Phone number invalid. Please try again')
    }),
    onSubmit: (values: IMyAccountFormik) => onSubmit(values)
  });
};
