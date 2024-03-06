import { validationResult } from "express-validator"
import UserValidators from "../util/Validators"
import ErrorHandling from "../errors/errorHandler"
import { Router, type Request, type Response, type NextFunction } from "express"
import UserController from "../controller/userController"
import Logger from "../util/Logger"
const router = Router()

/**
 * Route to handle user data updates.
 * Validates the request body for errors before proceeding with the update.
 * In case of validation errors, a 400 status code with the error details is returned.
 * On success, the updateUser method of the UserController is called.
 */
router.post(
  "/update-user",
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    UserValidators.validateUpdateUserData({
      email: req.body.username,
      password: req.body.password,
    })
      .then((validationResult) => {
        if (!validationResult.isValid && validationResult.error != null) {
          const error = new Error(validationResult.error.message) as Error & {
            status?: number
          }
          error.status = validationResult.error.status
          Logger.logException(error, {
            file: "UpdateUserRoute.ts",
            reason: "UpdateUserValidationFailed",
          })
          throw error
        }
        void UserController.updateUser(req, res)
      })
      .catch((err) => {
        if (err instanceof Error) {
          ErrorHandling.handleError(err, req, res, next)
        } else {
          const error = new Error("An unexpected error occurred") as Error & {
            status?: number
          }
          error.status =
            Boolean(err) && typeof err.status === "number" ? err.status : 500
          ErrorHandling.handleError(error, req, res, next)
        }
      })
  }
)


/**
 * Route to send a confirmation email after user updates.
 * Validates the request body and if valid, invokes the emailConfirmation method of the UserController.
 * Handles any validation errors or exceptions that may occur during the process.
 */
router.post(
  "/send-confirmation",
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    UserValidators.validateUpdateUserEmail({
      email: req.body.username,
    })
      .then((validationResult) => {
        if (!validationResult.isValid && validationResult.error != null) {
          const error = new Error(validationResult.error.message) as Error & {
            status?: number
          }
          error.status = validationResult.error.status
          Logger.logException(error, {
            file: "UpdateUserRoute.ts",
            reason: "UpdateUserValidationFailed",
          })
          throw error
        }
        void UserController.emailConfirmation(req, res)
      })
      .catch((err) => {
        if (err instanceof Error) {
          ErrorHandling.handleError(err, req, res, next)
        } else {
          const error = new Error("An unexpected error occurred") as Error & {
            status?: number
          }
          error.status =
            Boolean(err) && typeof err.status === "number" ? err.status : 500
          ErrorHandling.handleError(error, req, res, next)
        }
      })
  }
)

export default router
