import { IJSONObject } from '@automatisch/types';

import defineTrigger from '../../../../helpers/define-trigger';

export default defineTrigger({
  name: 'Search cat images',
  key: 'searchCatImages',
  pollInterval: 15,
  description: 'Triggers when there is a new cat image.',

  async run($) {
    let page = 0;
    let response;

    const headers = {
      'x-api-key': $.auth.data.apiKey as string,
    };

    do {
      const requestPath = `/v1/images/search?page=${page}&limit=10&order=DESC`;
      response = await $.http.get(requestPath, { headers });

      response.data.forEach((image: IJSONObject) => {
        const dataItem = {
          raw: image,
          meta: {
            internalId: image.id as string,
          },
        };

        $.pushTriggerItem(dataItem);
      });

      page += 1;
    } while (response.data.length >= 10);
  },
});
