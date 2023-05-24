import { IGlobalVariable } from '@automatisch/types';

const verifyCredentials = async ($: IGlobalVariable) => {
    await $.http.get('/v1/images/search');

    await $.auth.set({
        screenName: $.auth.data.screenName,
    });
};

export default verifyCredentials;
