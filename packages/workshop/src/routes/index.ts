import { Router } from 'express';
import appsHandler from '../handlers/apps';

const router = Router();

router.use('/apps', appsHandler);

export default router;
