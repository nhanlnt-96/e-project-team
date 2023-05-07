import { Gender, VerifyEmailStatus } from 'constants/index';
import _ from 'lodash';
import { ILoggedData, IUserData } from 'services/authenticate';

export const generateUserDataObject = (data: any): IUserData => ({
  userId: _.get(data, 'userId', 0),
  fullName: _.get(data, 'fullName', ''),
  email: _.get(data, 'email', ''),
  phoneNumber: _.get(data, 'phoneNumber', ''),
  dob: _.get(data, 'dob', ''),
  gender: _.get(data, 'gender', Gender.FEMALE),
  addressDetail: _.get(data, 'addressDetail', ''),
  role: _.get(data, 'role', ''),
  verifyEmail: _.get(data, 'verifyEmail', VerifyEmailStatus.NOT_VERIFY_EMAIL)
});

export const generateLoggedData = (data: any): ILoggedData => ({
  email: _.get(data, 'email', ''),
  accessToken: _.get(data, 'accessToken', '')
});
