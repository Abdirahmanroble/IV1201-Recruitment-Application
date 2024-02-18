/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
// personRoutes.ts

import { Router } from "express";
import UserController from "../controller/userController";
import LoginController from "../controller/loginController";

const router = Router();

router.post("/login", LoginController.login);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/register", UserController.register);

export default router;
