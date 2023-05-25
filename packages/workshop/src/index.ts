import type { Server } from 'http';

import app from './app';
import logger from './helpers/logger';
import appConfig from './config/app';
import { compile } from './compile';

const preCompileApps = async () => {
  try {
    await compile();
    logger.info('Apps compiled');
  } catch (err) {
    logger.error('Error compiling apps', err);
  }
}

if (appConfig.rebuildApps) {
  preCompileApps();
}

const port = appConfig.port;
const server = app.listen(port, () => {
  logger.info(`Workshop is listening on http://localhost:${port}`);
});

function shutdown(server: Server) {
  server.close();
}

process.on('SIGTERM', () => {
  shutdown(server);
});
