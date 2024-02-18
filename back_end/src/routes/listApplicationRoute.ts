import { Router } from "express";
import UserController from "../controller/userController";

const router = Router();

router.get("/applications", UserController.getUserApplications);

export default router;
