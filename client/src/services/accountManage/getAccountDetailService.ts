import { USER_API_ENDPOINT } from 'services/authenticate';
import { axiosInstance } from 'services/utils';

const getAccountDetailService = async (userId: number) => await axiosInstance.get(`${USER_API_ENDPOINT}/get-account-detail/${userId}`);

export default getAccountDetailService;
