import { USER_API_ENDPOINT } from 'services/authenticate/configs';
import { IRegisterData } from 'services/authenticate/types';
import { axiosInstance } from 'services/utils';

const registerService = async (data: IRegisterData) => {
  return await axiosInstance.post(`${USER_API_ENDPOINT}/register`, {
    fullName: data.fullName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    addressDetail: '',
    gender: data.gender,
    dob: data.dob,
    password: data.password,
    confirmPassword: data.confirmPassword
  });
};

export default registerService;
