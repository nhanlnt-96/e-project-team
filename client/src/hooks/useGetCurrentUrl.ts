import { useLocation } from 'react-router-dom';

export const useGetCurrentUrl = () => {
  const { pathname } = useLocation();
  const baseUrl = 'http://localhost:3000';

  return `${baseUrl}/${pathname}`;
};
