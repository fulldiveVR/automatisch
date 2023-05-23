import fs from 'node:fs';
import path from 'node:path';
import { IApp } from '@automatisch/types';

const bundlesPath = path.resolve(__dirname, `../../bundles`);

let _bundledIds: string[] = [];

const bundledIds = (): string[] => {
  if (_bundledIds.length > 0) {
    return _bundledIds;
  }

  _bundledIds = fs
    .readdirSync(bundlesPath, {
      withFileTypes: true,
    })
    .reduce((apps, dirent) => {
      if (dirent.isDirectory()) return apps;

      const app = dirent.name.replace('.bundle.js', '');
      apps.push(app);

      return apps;
    }, []);

  return _bundledIds;
};

let _apps: IApp[] = [];

export const getAll = async (): Promise<IApp[]> => {
  if (_apps.length > 0) {
    return _apps;
  }

  const apps: IApp[] = [];
  const ids = bundledIds();
  for (const id of ids) {
    const app: { default: IApp } = await import(
      path.resolve(bundlesPath, `${id}.bundle.js`)
    );
    apps.push(app.default);
  }
  _apps = apps;

  return _apps;
};
