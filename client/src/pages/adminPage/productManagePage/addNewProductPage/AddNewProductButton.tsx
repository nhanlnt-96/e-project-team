import ButtonComp from 'components/buttonComp';
import { RouteBasePath } from 'constants/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddNewProductButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ButtonComp onClick={() => navigate(RouteBasePath.ADMIN_ADD_NEW_PRODUCT_PAGE_BASE_PATH)} isPrimary={false}>
      Create new product
    </ButtonComp>
  );
};

export default AddNewProductButton;
