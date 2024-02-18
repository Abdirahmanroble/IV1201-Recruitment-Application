// Inside your routes file (e.g., applicationRoutes.js)

import express from 'express';
import { UserController } from '../controller/userController';

const router = express.Router();

router.post('/createApplication', UserController.createApplication);

export default router;
