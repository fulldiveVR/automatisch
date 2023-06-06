import defineApp from '../../helpers/define-app';
import auth from './auth'
import actions from './actions/index'

export default defineApp({
  name: 'OK',
  key: 'ok',
  iconUrl: '{BASE_URL}/apps/thecatapi/assets/favicon.svg',
  authDocUrl: 'https://automatisch.io/docs/apps/ok/connection',
  supportsConnections: true,
  baseUrl: 'https://connect.ok.ru',
  apiBaseUrl: 'https://api.ok.ru',
  primaryColor: '000000',
  auth,
  actions,
});