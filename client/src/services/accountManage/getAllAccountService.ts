import { IUserData, USER_API_ENDPOINT } from 'services/authenticate';
import { axiosInstance } from 'services/utils';

const getAllAccountService = async (): Promise<IUserData[]> => await axiosInstance.get(`${USER_API_ENDPOINT}/get-account-list`);

export default getAllAccountService;
