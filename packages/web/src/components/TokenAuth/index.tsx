import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import useAuthentication from 'hooks/useAuthentication';
import { AUTH } from 'graphql/mutations/auth';
import * as URLS from 'config/urls';

type TokenAuthProps = {
  token: string;
};

function TokenAuth(props: TokenAuthProps): React.ReactElement {
  const { token } = props;

  const navigate = useNavigate();

  const authentication = useAuthentication();
  const [auth] = useMutation(AUTH);

  React.useEffect(() => {
    if (authentication.isAuthenticated) {
      navigate(URLS.DASHBOARD);
    } else {
      const authenticate = async (token: string) => {
        const { data } = await auth({
          variables: {
            input: { token },
          },
        });

        authentication.updateToken(data.auth.token);
      };

      authenticate(token);
    }
  }, [navigate, authentication.isAuthenticated, auth, token]);

  return <></>;
}

export default TokenAuth;
