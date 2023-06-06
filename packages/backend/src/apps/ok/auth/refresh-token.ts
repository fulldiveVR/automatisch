import { Buffer } from 'node:buffer';
import { IGlobalVariable } from '@automatisch/types';

const refreshToken = async ($: IGlobalVariable) => {
  const params = {
    refresh_token: $.auth.data.refreshToken,
    client_id: $.auth.data.client_id,
    client_secret: $.auth.data.client_secret,
    grant_type: 'refresh_token'
  };
  const response = await $.http.post('/oauth/token.do', null, { params });

  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  } = response.data;

  await $.auth.set({
    accessToken,
    refreshToken,
    expiresIn,
    token: $.auth.data.accessToken,
  });
};

export default refreshToken;
