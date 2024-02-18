import { Router } from 'express'
import {LoginController}  from '../controller/loginController'

const router = Router()

router.post('/login', LoginController.login);


export default router