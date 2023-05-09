import { USER_API_ENDPOINT } from 'services/authenticate/configs';
import { axiosInstance } from 'services/utils';

const getEmailVerifyTokenService = async () => await axiosInstance.post(`${USER_API_ENDPOINT}/get-verify-email-token`);

export default getEmailVerifyTokenService;
