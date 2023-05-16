import ButtonComp from 'components/buttonComp';
import { RouteBasePath } from 'constants/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNewAccButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ButtonComp onClick={() => navigate(RouteBasePath.ADMIN_CREATE_NEW_ACCOUNT_PAGE_BASE_PATH)} isPrimary={false}>
      Create new account
    </ButtonComp>
  );
};

export default CreateNewAccButton;
