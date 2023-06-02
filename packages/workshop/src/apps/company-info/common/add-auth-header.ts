import { TBeforeRequest } from '@automatisch/types';

const addAuthHeader: TBeforeRequest = ($, requestConfig) => {
    if ($.auth.data?.apiKey) {
        const apiKey = $.auth.data.apiKey as string;
        requestConfig.headers['X-RapidAPI-Key'] = apiKey;
    }

    return requestConfig;
};

export default addAuthHeader;
