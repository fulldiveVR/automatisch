import { IGlobalVariable } from '@automatisch/types';
import getCurrentUser from '../common/get-current-user';

const verifyCredentials = async ($: IGlobalVariable) => {
  const oauthRedirectUrlField = $.app.auth.fields.find(
    (field) => field.key == 'oAuthRedirectUrl'
  );
  const redirectUri = oauthRedirectUrlField.value as string;
  const params = {
    code: $.auth.data.code,
    client_id: $.auth.data.client_id,
    client_secret: $.auth.data.client_secret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code'
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

  const currentUser = await getCurrentUser($);

  await $.auth.set({
    screenName: currentUser.name,
    uid: currentUser.uid
  });
};

export default verifyCredentials;
