import ButtonComp from 'components/buttonComp';
import { Roles, RouteBasePath } from 'constants/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthSelector } from 'redux/authenticate/selector';
import { useAppSelector } from 'redux/hooks';

const CreateNewAccButton: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useAppSelector(getAuthSelector);

  return userData?.role.includes(Roles.ADMIN_ROLE) ? (
    <ButtonComp onClick={() => navigate(RouteBasePath.ADMIN_CREATE_NEW_ACCOUNT_PAGE_BASE_PATH)} isPrimary={false}>
      Create new account
    </ButtonComp>
  ) : (
    <></>
  );
};

export default CreateNewAccButton;
