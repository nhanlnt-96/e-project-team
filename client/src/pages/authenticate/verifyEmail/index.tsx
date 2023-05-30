import Loading from 'components/loading';
import { RouteBasePath } from 'constants/index';
import { useEffectOnce } from 'hooks/useEffectOnce';
import VerifyEmailResponseModal from 'pages/authenticate/verifyEmail/VerifyEmailResponseModal';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyEmailSelector } from 'redux/authenticate/selector';
import { verifyEmailThunk } from 'redux/authenticate/verifyEmailSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { checkTokenExistService } from 'services/token';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(verifyEmailSelector);
  const [isCheckingToken, setIsCheckingToken] = useState<boolean>(true);

  useEffectOnce(() => {
    checkTokenExistService(token as string)
      .then((response) => {
        if (!response) navigate(RouteBasePath.PAGE_NOT_FOUND);
      })
      .catch(() => navigate(RouteBasePath.PAGE_NOT_FOUND))
      .finally(() => setIsCheckingToken(false));
  });

  useEffect(() => {
    if (token && !isCheckingToken) {
      dispatch(verifyEmailThunk(token));
    }
  });

  return !isCheckingToken ? !isLoading ? <VerifyEmailResponseModal /> : <Loading isLoadingMask /> : <Loading isPageLoading />;
};

export default VerifyEmailPage;
