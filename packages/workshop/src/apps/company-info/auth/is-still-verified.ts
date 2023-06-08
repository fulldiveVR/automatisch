import { IGlobalVariable } from '@automatisch/types';
import getModels from '../common/get-models';

const isStillVerified = async ($: IGlobalVariable) => {
  await getModels($);
  return true;
};

export default isStillVerified;
