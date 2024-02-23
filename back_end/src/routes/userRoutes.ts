import { Router } from "express"
import UserController from "../controller/userController"
import { check, validationResult } from "express-validator"
import UserValidators from "../util/Validators"


const router = Router()

router.post(
  "/login",
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

router.post(
  "/register",
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

router.post(
  "/logout",
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
