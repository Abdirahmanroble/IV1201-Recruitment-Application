// personRoutes.ts

import { Router } from 'express'
import UserController from '../controller/userController'

const router = Router()

router.post('/login', UserController.login)

router.post('/register', UserController.register)

export default router
