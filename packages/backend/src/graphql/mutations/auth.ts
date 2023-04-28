import axios from 'axios';
import User from '../../models/user';
import appConfig from '../../config/app';
import { v4 as uuidv4 } from 'uuid';

type Params = {
  input: {
    token: string;
  };
};

const auth = async (_parent: unknown, params: Params) => {
  const response = await axios.get(`${appConfig.aiNewsApiHost}/user`, {
    headers: {
      Authorization: 'Bearer ' + params.input.token,
    },
  });

  const shortId = response.data.id;
  if (!shortId)
    throw new Error('Short userId could not be found with provided token.');

  const user = await User.query().findOne({ fulldive_short_id: shortId });
  if (user) {
    return { token: params.input.token, user };
  } else {
    const fullName = response.data.userName;
    if (!fullName) throw Error('User name could not be found.');

    const email = response.data.provider.email.id;
    if (!email) throw Error('User email could not be found.');

    const user = await User.query().insert({
      fullName,
      email,
      password: uuidv4(),
      role: 'user',
      fulldiveShortId: shortId,
    });
    return { token: params.input.token, user };
  }
};

export default auth;
