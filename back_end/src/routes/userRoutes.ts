import { Router } from "express";
import UserController from "../controller/userController";
import { check, validationResult } from "express-validator";
import UserValidators from "../util/Validators";
const router = Router();

router.post(
    "/login",
    async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        await UserValidators.validateLoginData(req.body);
        next();
      } catch (error) {
        if (error instanceof Error) {
          return res.status(400).json({ message: error.message });
        } else {
          return res.status(400).json({ message: "An unknown error occurred" });
        }
      }
    },
    UserController.login 
  );
  
router.post(
  "/register",
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      await UserValidators.validateRegistrationData(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Please use numbers or strings as input" });
    }
  },
  UserController.register // Your controller action for registration
);

export default router;
