/**
 * Initializes the router object from Express to define route handlers.
 * This router is specifically used to handle requests related to user applications.
 */
import { Router } from 'express'
import UserController from '../controller/userController'

const router = Router()

router.get('/applications', (req, res, next) => {
  UserController.getUserApplications(req, res).catch(next)
})

export default router
