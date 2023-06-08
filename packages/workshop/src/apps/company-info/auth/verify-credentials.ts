import { IGlobalVariable } from '@automatisch/types';
import getModels from '../common/get-models';

const verifyCredentials = async ($: IGlobalVariable) => {
  await getModels($);
};

export default verifyCredentials;
