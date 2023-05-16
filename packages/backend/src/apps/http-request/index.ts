import defineApp from '../../helpers/define-app';
import actions from './actions';

export default defineApp({
  name: 'HTTP Request',
  key: 'http-request',
  iconUrl: '{BASE_URL}/apps/http-request/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/http-request/connection',
  supportsConnections: false,
  baseUrl: '',
  apiBaseUrl: '',
  primaryColor: '000000',
  actions,
});
