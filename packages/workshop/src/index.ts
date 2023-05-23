import type { Server } from 'http';

import app from './app';
import appConfig from './config/app';

const port = appConfig.port;
const server = app.listen(port, () => {
  console.log(`Workshop is listening on http://localhost:${port}`);
});

function shutdown(server: Server) {
  server.close();
}

process.on('SIGTERM', () => {
  shutdown(server);
});
