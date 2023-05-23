import { Router } from 'express';

import { getAll } from '../services/apps';
import appView from '../views/app';

const router = Router();

router.get('/list', async (req, res) => {
  const response = (await getAll()).map(appView);
  res.json(response);
});

router.get('/:name.js', (req, res) => {
  const app = req.params.name;
  res.sendFile(`${app}.bundle.js`, { root: './bundles' });
});

export default router;
