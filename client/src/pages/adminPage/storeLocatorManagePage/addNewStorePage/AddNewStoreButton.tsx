import ButtonComp from 'components/buttonComp';
import { RouteBasePath } from 'constants/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddNewStoreButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ButtonComp onClick={() => navigate(RouteBasePath.ADMIN_ADD_STORE_LOCATOR_PAGE_BASE_PATH)} isPrimary={false}>
      Create new store locator
    </ButtonComp>
  );
};

export default AddNewStoreButton;
