import { FULL_NAME_REGEX, Gender, PASSWORD_REGEX, PHONE_NUMBER_REGEX, Roles } from 'constants/index';
import { useFormik } from 'formik';
import _ from 'lodash';
import { IRegisterFormikValues } from 'pages/authenticate/register/useRegisterFormik';
import { IUserData } from 'services/authenticate';
import * as Yup from 'yup';

export interface IAccountInFoValues extends Omit<IRegisterFormikValues, 'confirmPassword'> {
  roleName?: string;
  addressDetail: string;
}

// eslint-disable-next-line no-unused-vars
export const useAccountInfoFormik = (onSubmit?: (values: IAccountInFoValues) => void, userData?: IUserData) => {
  const initialValues: IAccountInFoValues = {
    fullName: _.get(userData, 'fullName', ''),
    dob: _.get(userData, 'dob', ''),
    phoneNumber: _.get(userData, 'phoneNumber', ''),
    addressDetail: _.get(userData, 'addressDetail', ''),
    gender: _.get(userData, 'gender', null),
    roleName: _.get(userData, 'role', Roles.USER_ROLE),
    email: _.get(userData, 'email', ''),
    password: ''
  };

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
      email: Yup.string().trim().email('Email invalid').required('Please enter your email'),
      gender: Yup.number().required('Please select your gender').oneOf([Gender.FEMALE, Gender.MALE], 'Please select your gender'),
      dob: Yup.string().trim().required('Please select date of birth'),
      phoneNumber: Yup.string().trim().required('Please enter phone number').matches(PHONE_NUMBER_REGEX, 'Phone number invalid. Please try again'),
      addressDetail: Yup.string().trim().required('Please enter address detail'),
      password: Yup.string()
        .trim()
        .required('Please enter your password')
        .matches(
          PASSWORD_REGEX,
          'Password must have: at least 8 characters, maximum 30 characters; at least one uppercase; at least one number; no special character. Please try again'
        )
    }),
    onSubmit: async (values) => {
      if (onSubmit) onSubmit(values);
    }
  });
};
