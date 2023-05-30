import { USER_API_ENDPOINT } from 'services/authenticate/configs';
import { IResetPasswordData } from 'services/authenticate/types';
import { axiosInstance } from 'services/utils';

const resetPasswordService = async (data: IResetPasswordData) =>
  await axiosInstance.put(`${USER_API_ENDPOINT}/reset-password`, {
    token: data.token,
    password: data.password,
    confirmPassword: data.confirmPassword
  });

export default resetPasswordService;
