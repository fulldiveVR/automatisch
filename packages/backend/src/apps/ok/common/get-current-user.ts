import { IGlobalVariable, IJSONObject } from '@automatisch/types';
import { okSignature } from './get-signature';

const getCurrentUser = async ($: IGlobalVariable): Promise<IJSONObject> => {
  let params: any = {
    // user: $.auth.data.userId as string,
    // client_id: 512001667119,
    // client_secret: 'DBA31537C393F192F4B9CBC0',
    // grant_type: 'authorization_code'
    application_key: $.auth.data.client_public,
    format: 'json',
  };

  params.sig = okSignature(params, $.auth.data.accessToken as string);
  params.access_token = $.auth.data.accessToken;

  const response = await $.http.get('/api/users/getCurrentUser', { params });
  const currentUser = response.data;

  return currentUser;
};

export default getCurrentUser;
