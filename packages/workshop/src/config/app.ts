import * as dotenv from 'dotenv';
dotenv.config();

type AppEnv = 'development' | 'production';

type AppConfig = {
  appEnv: AppEnv;
  port: string;
};

const appConfig: AppConfig = {
  port: process.env.PORT || '3003',
  appEnv: (process.env.APP_ENV || 'development') as AppEnv,
};

export default appConfig;
