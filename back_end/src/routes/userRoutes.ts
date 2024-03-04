import { type Request, type Response, type NextFunction, Router } from 'express'
import UserController from '../controller/userController'
import { validationResult } from 'express-validator'
import UserValidators from '../util/Validators'
import ErrorHandling from '../errors/errorHandler'
import Logger from '../util/Logger'

/* Initialize the router object from Express */
const router = Router()
/**
 * Route for handling user login requests.
 * This route first validates the request body for any errors using the express-validator package.
 * If errors are found, it returns a 400 status with the error details.
 * Otherwise, it proceeds to validate the login data using the UserValidators utility,
 * then calls the login controller method if validation succeeds.
 */
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  UserValidators.validateLoginData({
    username: req.body.username,
    password: req.body.password
  })
    .then((validationResult) => {
      if (!validationResult.isValid && validationResult.error != null) {
        // Create an error object with a status property and throw it to be caught by the catch block
        const error = new Error(validationResult.error.message) as Error & {
          status?: number
          errorCode?: number
        }
        error.status = validationResult.error.status
        error.errorCode = validationResult.error.errorCode
        Logger.logException(error, { file: 'UserRoutes.ts', reason: 'UserLoginValidationFailed' })
        throw error
      }
      // If validation is successful, proceed with login
      void UserController.login(req, res)
    })
    .catch((err) => {
      // Use ErrorHandling to process and send the error response
      if (err instanceof Error) {
        ErrorHandling.handleError(err, req, res, next)
      } else {
        // If it's not an instance of Error, it could be a thrown object from the then block
        const error = new Error('An unexpected error occurred') as Error & {
          status?: number
        }
        error.status =
          Boolean(err) && typeof err.status === 'number' ? err.status : 500
        ErrorHandling.handleError(error, req, res, next)
      }
    })
})

/**
 * Route for handling user registration requests.
 * Validates the request body for errors, returning a 400 status with the error details if any are found.
 * If no errors are present, it validates the registration data using UserValidators,
 * then proceeds to the registration controller method if validation is successful.
 */
router.post('/register', (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  UserValidators.validateRegistrationData({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    pnr: req.body.pnr
  })
    .then((validationResult) => {
      if (!validationResult.isValid && validationResult.error != null) {
        // Create an error object with a status property and throw it to be caught by the catch block
        const error = new Error(validationResult.error.message) as Error & {
          status?: number
          errorCode?: number
        }
        error.status = validationResult.error.status
        error.errorCode = validationResult.error.errorCode
        Logger.logException(error, { file: 'UserRoutes.ts', reason: 'UserRegisterValidationFailed' })
        throw error
      }
      void UserController.register(req, res)
    })
    .catch((err) => {
      // Use ErrorHandling to process and send the error response
      if (err instanceof Error) {
        ErrorHandling.handleError(err, req, res, next)
      } else {
        // If it's not an instance of Error, it could be a thrown object from the then block
        const error = new Error('An unexpected error occurred') as Error & {
          status?: number
        }
        error.status =
          Boolean(err) && typeof err.status === 'number' ? err.status : 500
        ErrorHandling.handleError(error, req, res, next)
      }
    })
})
/**
 * Route for handling user logout requests.
 * Validates the request to ensure no validation errors are present.
 * If validation errors are found, it returns a 400 status with the error details.
 * Otherwise, it validates the logout request using UserValidators,
 * then calls the logout controller method if validation succeeds.
 */
router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    Logger.logException(new Error('Something work with the request'), { file: 'UserRoutes.ts', reason: 'UserLoginValidationFailed' })
    return res.status(400).json({ errors: errors.array() })
  }
  UserValidators.validateLogout(req)
    .then((validationResult) => {
      if (!(validationResult.isValid) && validationResult.error != null) {
        // Create an error object with a status property and throw it to be caught by the catch block
        const error = new Error(validationResult.error.message) as Error & {
          status?: number
          errorCode?: number
        }
        error.status = validationResult.error.status
        error.errorCode = validationResult.error.errorCode
        Logger.logException(error, { file: 'UserRoutes.ts', reason: 'UserLogoutValidationFailed' })
        throw error
      }
      void UserController.logout(res)
    })
    .catch((err) => {
      // Use ErrorHandling to process and send the error response
      if (err instanceof Error) {
        ErrorHandling.handleError(err, req, res, next)
      } else {
        // If it's not an instance of Error, it could be a thrown object from the then block
        const error = new Error('An unexpected error occurred') as Error & {
          status?: number
        }
        error.status =
          Boolean(err) && typeof err.status === 'number' ? err.status : 500
        ErrorHandling.handleError(error, req, res, next)
      }
    })
})

export default router
