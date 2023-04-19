import { useContext } from 'react';

import ProductFormContext from './index';

const useProductFormContext = () => {
  return useContext(ProductFormContext);
};

export default useProductFormContext;
