import { rule, shield, allow } from 'graphql-shield';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import appConfig from '../config/app';

const isAuthenticated = rule()(async (_parent, _args, req) => {
  const token = req.headers['authorization'];

  if (token == null) return false;

  const verified = jwt.verify(token, appConfig.appSecretKey);

  try {
    const { userId } = verified as { userId: string };
    if (userId) {
      req.currentUser = await User.query().findById(userId).throwIfNotFound();
      return true;
    }

    const { id: shortId } = verified as { id: string };
    if (shortId) {
      req.currentUser = await User.query()
        .findOne({ fulldive_short_id: shortId })
        .throwIfNotFound();
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
});

const authentication = shield(
  {
    Query: {
      '*': isAuthenticated,
      getAutomatischInfo: allow,
      healthcheck: allow,
    },
    Mutation: {
      '*': isAuthenticated,
      login: allow,
      auth: allow,
      createUser: allow,
      forgotPassword: allow,
      resetPassword: allow,
    },
  },
  {
    allowExternalErrors: true,
  }
);

export default authentication;
