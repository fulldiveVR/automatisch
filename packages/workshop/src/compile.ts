import fs from 'node:fs';
import path from 'node:path';
import webpack from 'webpack';

import logger from './helpers/logger';
import appConfig from './config/app';

const configure = (app: string): webpack.Configuration => {
  return {
    entry: path.resolve(__dirname, `./apps`, app),
    output: {
      path: path.resolve(__dirname, '../bundles'),
      filename: `${app}.bundle.js`,
      globalObject: 'this',
      library: {
        type: 'commonjs',
      },
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['node_modules'],
    },
    mode: appConfig.appEnv,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  };
};

export const compile = async (): Promise<void> => {
  const apps = fs
    .readdirSync(path.resolve(__dirname, `./apps/`), { withFileTypes: true })
    .reduce((apps, dirent) => {
      if (!dirent.isDirectory()) return apps;

      apps.push(dirent.name);

      return apps;
    }, []);

  const options = apps.map(configure);
  const compiler = webpack(options);

  return new Promise<void>((resolve, reject) => {
    compiler.run((err, stats) => {
      const hasErrors = !!(stats.hasErrors() || err);
      if (hasErrors) {
        logger.info(stats.toString());
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
