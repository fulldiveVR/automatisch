import express, { Application } from 'express';
import { dirname, join } from 'path';
import appConfig from '../config/app';

const docsHandler = async (app: Application) => {
  if (appConfig.serveWebAppSeparately) return;

  const docsAppPath = require.resolve('@automatisch/docs');

  const docsBuildPath = join(dirname(docsAppPath), 'pages/.vitepress/dist');
  app.use('/docs', express.static(docsBuildPath));

  const indexHtml = join(dirname(docsBuildPath), 'dist', 'index.html');
  app.get('/docs(/*)?', (_req, res) => res.sendFile(indexHtml));
};

export default docsHandler;
