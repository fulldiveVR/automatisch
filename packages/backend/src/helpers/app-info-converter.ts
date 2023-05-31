import type { IApp } from '@automatisch/types';
import appConfig from '../config/app';

const appInfoConverter = (rawAppData: IApp) => {
  const iconHosts = [['{BASE_URL}', appConfig.baseUrl], ['{WORKSHOP_URL}', appConfig.workshopApiUrl]];
  for (const [pattern, host] of iconHosts) {
    rawAppData.iconUrl = rawAppData.iconUrl.replace(pattern, host);
  }

  rawAppData.authDocUrl = rawAppData.authDocUrl?.replace(
    '{DOCS_URL}',
    appConfig.docsBaseUrl
  );

  rawAppData.docUrl = rawAppData.docUrl?.replace(
    '{DOCS_URL}',
    appConfig.docsBaseUrl
  );

  if (rawAppData.auth?.fields) {
    rawAppData.auth.fields = rawAppData.auth.fields.map((field) => {
      if (field.type === 'string' && typeof field.value === 'string') {
        return {
          ...field,
          value: field.value.replace('{WEB_APP_URL}', appConfig.webAppUrl),
          docUrl: field.docUrl?.replace('{DOCS_URL}', appConfig.docsBaseUrl),
        };
      }

      return field;
    });
  }

  return rawAppData;
};

export default appInfoConverter;
