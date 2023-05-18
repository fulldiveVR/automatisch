import defineApp from '../../helpers/define-app';
import triggers from './triggers';

export default defineApp({
  name: 'RSS',
  key: 'rss',
  iconUrl: '{BASE_URL}/apps/rss/assets/favicon.svg',
  authDocUrl: '{DOCS_URL}/apps/rss/connection',
  supportsConnections: false,
  baseUrl: '',
  apiBaseUrl: '',
  primaryColor: 'ff8800',
  triggers,
});
