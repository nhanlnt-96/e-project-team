import { TOKEN_END_POINT } from 'services/token/configs';
import { axiosInstance } from 'services/utils';

const checkTokenExistService = async (token: string) => await axiosInstance.get(`${TOKEN_END_POINT}/check-token-exist/${token}`);

export default checkTokenExistService;
