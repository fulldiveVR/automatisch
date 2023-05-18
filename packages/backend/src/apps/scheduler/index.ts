import defineApp from '../../helpers/define-app';
import triggers from './triggers';

export default defineApp({
  name: 'Scheduler',
  key: 'scheduler',
  iconUrl: '{BASE_URL}/apps/scheduler/assets/favicon.svg',
  docUrl: '{DOCS_URL}/scheduler',
  authDocUrl: '{DOCS_URL}/apps/scheduler/connection',
  baseUrl: '',
  apiBaseUrl: '',
  primaryColor: '0059F7',
  supportsConnections: false,
  triggers,
});
