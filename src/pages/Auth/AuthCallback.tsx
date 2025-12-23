import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useCreateSessionMutation } from '../../api/tmdb/authApi';
import { useGetAccountQuery } from '../../api/tmdb/accountApi';
import { setSessionId, setAccount } from '../../app/authSlice';

const AuthCallbackPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestToken = params.get('request_token');

  const [createSession, { data: sessionData }] = useCreateSessionMutation();

  useEffect(() => {
    if (requestToken) {
      createSession({ request_token: requestToken });
    }
  }, [requestToken]);

  useEffect(() => {
    if (sessionData?.session_id) {
      dispatch(setSessionId(sessionData.session_id));
    }
  }, [sessionData]);

  const { data: accountData } = useGetAccountQuery(sessionData?.session_id!, {
    skip: !sessionData?.session_id,
  });

  useEffect(() => {
    if (accountData?.id) {
      dispatch(setAccount(accountData));
      navigate('/');
    }
  }, [accountData]);

  return null;
};

export default AuthCallbackPage;
