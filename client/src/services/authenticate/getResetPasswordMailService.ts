import { USER_API_ENDPOINT } from 'services/authenticate/configs';
import { axiosInstance } from 'services/utils';

const getResetPasswordMailService = async (email: string) =>
  await axiosInstance.post(`${USER_API_ENDPOINT}/get-reset-password-token`, {
    email: email
  });

export default getResetPasswordMailService;
