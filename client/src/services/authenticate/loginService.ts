import { AUTHENTICATE_API_ENDPOINT } from 'services/authenticate/configs';
import { ILoggedData } from 'services/authenticate/types';
import { axiosInstance } from 'services/utils';

export interface ILoginData {
  email: string;
  password: string;
}

const loginService = async (data: ILoginData): Promise<any> =>
  await axiosInstance.post(`${AUTHENTICATE_API_ENDPOINT}/login`, {
    email: data.email,
    password: data.password
  });

export default loginService;
