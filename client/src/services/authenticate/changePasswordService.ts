import { USER_API_ENDPOINT } from 'services/authenticate/configs';
import { IChangePasswordData } from 'services/authenticate/types';
import { axiosInstance } from 'services/utils';

const changePasswordService = async (data: IChangePasswordData) =>
  await axiosInstance.put(`${USER_API_ENDPOINT}/change-password`, {
    oldPassword: data.oldPassword,
    password: data.password,
    confirmPassword: data.confirmPassword
  });

export default changePasswordService;
