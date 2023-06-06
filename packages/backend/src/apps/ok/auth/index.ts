import verifyCredentials from './verify-credentials';
import isStillVerified from './is-still-verified';
import generateAuthUrl from './generate-auth-url';
import refreshToken from './refresh-token';

export default {
  fields: [
    {
      key: 'oAuthRedirectUrl',
      label: 'OAuth Redirect URL',
      type: 'string' as const,
      required: true,
      readOnly: true,
      value: '{WEB_APP_URL}/app/thecatapi/connections/add',
      placeholder: null,
      description:
        'When asked to input an OAuth callback or redirect URL in Slack OAuth, enter the URL above.',
      clickToCopy: true,
    },
    {
      key: 'client_id',
      label: 'Client ID',
      type: 'string' as const,
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description: 'Client ID',
      clickToCopy: false,
    },
    {
      key: 'client_public',
      label: 'Client public key',
      type: 'string' as const,
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description: 'Client public key',
      clickToCopy: false,
    },
    {
      key: 'client_secret',
      label: 'Client secret key',
      type: 'string' as const,
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description: 'Client secret key',
      clickToCopy: false,
    },
    {
      key: 'access_token',
      label: 'Access token',
      type: 'string' as const,
      required: true,
      readOnly: false,
      value: null,
      placeholder: null,
      description: 'Access token',
      clickToCopy: false,
    },

    // {
    //   key: 'public_key',
    //   label: 'Public key',
    //   type: 'string' as const,
    //   required: true,
    //   readOnly: false,
    //   value: null,
    //   placeholder: null,
    //   description: 'Public key',
    //   clickToCopy: false,
    // },
    // {
    //   key: 'private_key',
    //   label: 'Private key',
    //   type: 'string' as const,
    //   required: true,
    //   readOnly: false,
    //   value: null,
    //   placeholder: null,
    //   description: 'Public key',
    //   clickToCopy: false,
    // },
  ],
  verifyCredentials,
  isStillVerified,
  generateAuthUrl,
  refreshToken
};