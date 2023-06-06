import { IGlobalVariable } from '@automatisch/types';
import getCurrentUser from '../common/get-current-user';

const isStillVerified = async ($: IGlobalVariable) => {
  const user = await getCurrentUser($);
  return !!user.uid;
};

export default isStillVerified;
