import { USER_API_ENDPOINT } from 'services/authenticate/configs';
import { IUpdateAccountData } from 'services/authenticate/types';
import { axiosInstance } from 'services/utils';

const updateAccountService = async (updateData: IUpdateAccountData) => await axiosInstance.put(`${USER_API_ENDPOINT}/update-account`, updateData);

export default updateAccountService;
