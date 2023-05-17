import axios from 'axios';
import jwt from 'jsonwebtoken';
import User from '../../models/user';
import appConfig from '../../config/app';
import { v4 as uuidv4 } from 'uuid';

type Params = {
  input: {
    token: string;
  };
};

const auth = async (_parent: unknown, params: Params) => {
  const response = await axios.get(`${appConfig.wizeApiHost}/user`, {
    headers: {
      Authorization: 'Bearer ' + params.input.token,
    },
  });

  const shortId = response.data.id;
  if (!shortId)
    throw new Error('Short userId could not be found with provided token.');

  const user = await User.query().findOne({ fulldive_short_id: shortId });
  if (user) {
    return createToken(user);
  } else {
    const fullName = response.data.userName;
    if (!fullName) throw Error('User name could not be found.');

    const email = response.data.provider.email.id;
    if (!email) throw Error('User email could not be found.');

    const user = await User.query().insertAndFetch({
      fullName,
      email,
      password: uuidv4(),
      role: 'user',
      fulldiveShortId: shortId,
    });
    return createToken(user);
  }
};

const createToken = (user: User) => {
  const token = jwt.sign({ userId: user.id }, appConfig.appSecretKey);
  return { token, user };
}

export default auth;
