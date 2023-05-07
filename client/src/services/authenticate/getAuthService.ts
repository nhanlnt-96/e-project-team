import { AUTHENTICATE_API_ENDPOINT } from 'services/authenticate/configs';
import { axiosInstance } from 'services/utils';

const getAuthService = async () => await axiosInstance(`${AUTHENTICATE_API_ENDPOINT}/get-auth`);

export default getAuthService;
