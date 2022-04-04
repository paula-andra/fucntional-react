import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { VFC, useEffect } from 'react';

import { Row } from '../../../../components/Row';

import { useUserProfile } from './UserProfileContext';

const useAuthenticatedWithToken = (searchParams: URLSearchParams, navigate: (nextInit: URLSearchParamsInit) => void) => {
  const { userProfile, setUserProfile } = useUserProfile();
  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!userProfile && tokenParam) {
      setUserProfile(tokenParam);
      searchParams.delete('token');
      navigate(searchParams);
    }
  }, [searchParams, userProfile, setUserProfile, navigate]);
  return { userProfile };
};

export const ContextExample: VFC = () => {
  const [searchParams, navigate] = useSearchParams();
  const { userProfile } = useAuthenticatedWithToken(searchParams, navigate);

  if (userProfile) return <Row>Current user {userProfile}</Row>;

  return <Row>
    <button onClick={() => {
      searchParams.set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
      navigate(searchParams);
    }}>
      Login
    </button>
  </Row>;
};
