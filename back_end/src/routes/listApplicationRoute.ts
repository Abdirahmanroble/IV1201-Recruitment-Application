import { Router } from 'express'
import UserController from '../controller/userController'

const router = Router()

router.get('/applications', (req, res, next) => {
  UserController.getUserApplications(req, res).catch(next)
})

export default router
