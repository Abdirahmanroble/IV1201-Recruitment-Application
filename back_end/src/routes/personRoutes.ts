import { Router } from 'express'
import { LoginController } from '../controller/loginController'

const router = Router()

router.post('/login', (req, res, next) => {
  LoginController.login(req, res).catch(next)
})

export default router
