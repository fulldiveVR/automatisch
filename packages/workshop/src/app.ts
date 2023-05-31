import express from 'express';
import router from './routes';
import appAssetsHandler from './helpers/app-assets-handler';

const app = express();

appAssetsHandler(app);

app.use('/', router);

export default app;
