import Loading from 'components/loading';
import { useEffectOnce } from 'hooks/useEffectOnce';
import VerifyEmailResponseModal from 'pages/authenticate/verifyEmail/VerifyEmailResponseModal';
import React from 'react';
import { useParams } from 'react-router-dom';
import { verifyEmailSelector } from 'redux/authenticate/selector';
import { verifyEmailThunk } from 'redux/authenticate/verifyEmailSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(verifyEmailSelector);

  useEffectOnce(() => {
    if (token) {
      dispatch(verifyEmailThunk(token));
    }
  });

  return !isLoading ? <VerifyEmailResponseModal /> : <Loading isLoadingMask />;
};

export default VerifyEmailPage;
