import fs from 'node:fs';
import path from 'node:path';
import webpack from 'webpack';

import appConfig from './config/app';

const configure = (app: string): webpack.Configuration => {
  return {
    entry: `./src/apps/${app}/index.ts`,
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

const compile = () => {
  const apps = fs
    .readdirSync(path.resolve(__dirname, `./apps/`), { withFileTypes: true })
    .reduce((apps, dirent) => {
      if (!dirent.isDirectory()) return apps;

      apps.push(dirent.name);

      return apps;
    }, []);

  const options = apps.map(configure);
  const compiler = webpack(options);
  compiler.run((err, stats) => {
    const hasErrors = !!(stats.hasErrors() || err);
    if (hasErrors) {
      console.log('stats', stats);
      console.error('err', err);
    }

    console.info(`Compilation complete${hasErrors ? ' with errors' : ''}`);
  });
};

compile();
