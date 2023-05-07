import { createContext } from 'react';
import { IUserData } from 'services/authenticate';

export interface IAuthContext {
  userData: IUserData | null;
}

const initialStates: IAuthContext = {
  userData: null
};
const AuthContext = createContext(initialStates);

export default AuthContext;
