import defineApp from '../../helpers/define-app';
import addAuthHeader from './common/add-auth-header';
import auth from './auth';
import actions from './actions';

export default defineApp({
    name: 'Company Info',
    key: 'company-info',
    iconUrl: '{WORKSHOP_URL}/apps/company-info/assets/favicon.svg',
    authDocUrl: '{DOCS_URL}/apps/company-info/connection',
    supportsConnections: true,
    baseUrl: 'https://rapidapi.com',
    apiBaseUrl: 'https://companies-datas.p.rapidapi.com',
    primaryColor: '000000',
    beforeRequest: [addAuthHeader],
    auth,
    actions,
});
