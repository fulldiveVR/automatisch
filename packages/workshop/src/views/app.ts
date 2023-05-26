import { IApp } from '@automatisch/types';

export default (app: IApp) => {
  return {
    id: app.key,
    name: app.name,
    actions: app.actions?.map(({ key, name }) => {
      return { key, name };
    }),
  };
};
