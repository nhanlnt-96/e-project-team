export interface IRegisterData {
  fullName: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
  email: string;
  addressDetail?: string;
  gender: number;
  dob: string;
}

export interface IUserData {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  addressDetail: string;
  verifyEmail: number;
  gender: number;
  dob: string;
  role: string;
}

export interface ILoggedData {
  email: string;
  accessToken: string;
}
