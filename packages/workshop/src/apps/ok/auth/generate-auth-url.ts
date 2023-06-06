import { IField, IGlobalVariable } from '@automatisch/types';
import qs from 'qs';

export default async function generateAuthUrl($: IGlobalVariable) {
  const scopes = ['VALUABLE_ACCESS', 'LONG_ACCESS_TOKEN'];
  const oauthRedirectUrlField = $.app.auth.fields.find(
    (field: IField) => field.key == 'oAuthRedirectUrl'
  );
  const redirectUri = oauthRedirectUrlField.value as string;
  const searchParams = qs.stringify({
    client_id: $.auth.data.client_id as string,
    redirect_uri: redirectUri,
    scope: scopes.join(';'),
    response_type: 'code',
  });

  const url = `${$.app.baseUrl
    }/oauth/authorize?${searchParams.toString()}`;

  await $.auth.set({
    url,
  });
}
