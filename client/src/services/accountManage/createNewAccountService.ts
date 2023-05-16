import { ICreateNewAccountData } from 'services/accountManage/types';
import { USER_API_ENDPOINT } from 'services/authenticate';
import { axiosInstance } from 'services/utils';

const createNewAccountService = async (accountData: ICreateNewAccountData) =>
  await axiosInstance.post(`${USER_API_ENDPOINT}/create-new-account`, {
    fullName: accountData.fullName,
    password: accountData.password,
    phoneNumber: accountData.phoneNumber,
    email: accountData.email,
    addressDetail: accountData.addressDetail,
    gender: accountData.gender,
    dob: accountData.dob,
    roleName: accountData.roleName
  });

export default createNewAccountService;
