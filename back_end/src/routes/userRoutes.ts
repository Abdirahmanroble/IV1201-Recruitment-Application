/* eslint-disable @typescript-eslint/no-misused-promises,
    @typescript-eslint/await-thenable,
    @typescript-eslint/no-confusing-void-expression,
    @typescript-eslint/no-unsafe-argument,
    @typescript-eslint/unbound-method,
    @typescript-eslint/explicit-function-return-type,
    @typescript-eslint/strict-boolean-expressions */

import { Router } from 'express'
import UserController from '../controller/userController'
import { validationResult } from 'express-validator'
import UserValidators from '../util/Validators'

/* Initialize the router object from Express */
const router = Router()
/**
 * Route for handling user login requests.
 * This route first validates the request body for any errors using the express-validator package.
 * If errors are found, it returns a 400 status with the error details.
 * Otherwise, it proceeds to validate the login data using the UserValidators utility,
 * then calls the login controller method if validation succeeds.
 */
router.post(
  '/login',
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      await UserValidators.validateLoginData(req.body)
      next()
    } catch (err) {
      next(err)
    }
  },
  UserController.login
)
/**
 * Route for handling user registration requests.
 * Validates the request body for errors, returning a 400 status with the error details if any are found.
 * If no errors are present, it validates the registration data using UserValidators,
 * then proceeds to the registration controller method if validation is successful.
 */
router.post(
  '/register',
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      await UserValidators.validateRegistrationData(req.body)
      next()
    } catch (err) {
      next(err)
    }
  },
  UserController.register
)
/**
 * Route for handling user logout requests.
 * Validates the request to ensure no validation errors are present.
 * If validation errors are found, it returns a 400 status with the error details.
 * Otherwise, it validates the logout request using UserValidators,
 * then calls the logout controller method if validation succeeds.
 */
router.post(
  '/logout',
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      await UserValidators.validateLogout(req)
      next()
    } catch (err) {
      next(err)
    }
  },
  UserController.logout
)

export default router
