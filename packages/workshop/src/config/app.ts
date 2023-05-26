import * as dotenv from 'dotenv';
dotenv.config();

type AppEnv = 'development' | 'production';

type AppConfig = {
  appEnv: AppEnv;
  port: string;
  rebuildApps: boolean;
};

const appConfig: AppConfig = {
  port: process.env.PORT || '3003',
  appEnv: (process.env.APP_ENV || 'development') as AppEnv,
  rebuildApps: process.env.REBUILD_APPS === 'true',
};

export default appConfig;
