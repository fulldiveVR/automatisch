import defineApp from '../../helpers/define-app';
import addAuthHeader from './common/add-auth-header';
import auth from './auth';
import triggers from './triggers';
import dynamicData from './dynamic-data';

export default defineApp({
  name: 'Typeform',
  key: 'typeform',
  iconUrl: '{BASE_URL}/apps/typeform/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/typeform/connection',
  supportsConnections: true,
  baseUrl: 'https://typeform.com',
  apiBaseUrl: 'https://api.typeform.com',
  primaryColor: '262627',
  beforeRequest: [addAuthHeader],
  auth,
  triggers,
  dynamicData,
});
