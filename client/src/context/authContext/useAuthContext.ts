import { useContext } from 'react';

import AuthContext from './index';

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
