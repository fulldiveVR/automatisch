import defineApp from '../../helpers/define-app';
import auth from './auth';
import actions from './actions';

export default defineApp({
    name: 'Company Info',
    key: 'company-info',
    iconUrl: '{WORKSHOP_URL}/apps/company-info/assets/favicon.svg',
    authDocUrl: '{DOCS_URL}/apps/company-info/connection',
    supportsConnections: true,
    baseUrl: '',
    apiBaseUrl: '',
    primaryColor: '000000',
    auth,
    actions,
});
