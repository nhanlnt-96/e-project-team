import { FULL_NAME_REGEX, Gender, PASSWORD_REGEX, PHONE_NUMBER_REGEX } from 'constants/index';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export interface IRegisterFormikValues {
  fullName: string;
  email: string;
  gender: number | null;
  dob: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export const useRegisterFormik = (onSubmit: (values: IRegisterFormikValues) => void) => {
  const initialValues: IRegisterFormikValues = {
    fullName: '',
    email: '',
    gender: null,
    dob: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  };

  return useFormik<IRegisterFormikValues>({
    initialValues: initialValues,
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
      password: Yup.string()
        .trim()
        .required('Please enter your password')
        .matches(
          PASSWORD_REGEX,
          'Password must have: at least 8 characters, maximum 30 characters; at least one uppercase; at least one number; no special character. Please try again'
        ),
      confirmPassword: Yup.string()
        .trim()
        .required('Please enter confirm password')
        .oneOf([Yup.ref('password')], 'Password confirmation does not match')
    }),
    onSubmit: (values) => onSubmit(values)
  });
};
