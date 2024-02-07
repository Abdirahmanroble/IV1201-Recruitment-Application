// personRoutes.ts

import { Router } from 'express';
import PersonController from '../controller/personController';

const router = Router();

router.post('/login', PersonController.login);

export default router;
