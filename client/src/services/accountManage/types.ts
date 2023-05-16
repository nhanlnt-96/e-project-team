import { IRegisterData } from 'services/authenticate';

export interface ICreateNewAccountData extends Omit<IRegisterData, 'confirmPassword' | 'addressDetail'> {
  addressDetail: string;
  roleName: string;
}
