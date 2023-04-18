import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { ToastContainer } from 'react-toastify';

export const TOASTIFY_AUTO_CLOSE_TIMER = 2000;

const ToastifyProvider: React.FC = () => {
  return <ToastContainer position='top-center' pauseOnHover autoClose={TOASTIFY_AUTO_CLOSE_TIMER} />;
};

export default ToastifyProvider;
