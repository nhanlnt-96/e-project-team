import { USER_API_ENDPOINT } from 'services/authenticate/configs';
import { axiosInstance } from 'services/utils';

const verifyEmailService = async (token: string) =>
  await axiosInstance.put(`${USER_API_ENDPOINT}/verify-email`, {
    token: token
  });

export default verifyEmailService;
