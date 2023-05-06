import 'react-toastify/dist/ReactToastify.css';
import './ToastifyProvider.scss';

import React from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const TOASTIFY_AUTO_CLOSE_TIMER = 2000;

const ToastifyProvider: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <ToastContainer
      position={pathname.includes('admin') ? 'top-center' : 'bottom-right'}
      pauseOnHover
      autoClose={TOASTIFY_AUTO_CLOSE_TIMER}
      className='toastify-container'
    />
  );
};

export default ToastifyProvider;
