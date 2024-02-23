import UserController from '../controller/userController'
import { check, validationResult } from 'express-validator'
import { Router, Request, Response, NextFunction } from 'express';
/**
 * Initializes the router object from Express to define route handlers.
 * This router is specifically used to handle requests related to user applications.
 */
const router = Router()

/**
 * GET route for fetching applications associated with a user.
 * Delegates the request handling to UserController.getUserApplications,
 * which is responsible for retrieving and sending the user's applications.
 * Any errors thrown during execution are caught and passed to the next middleware,
 * typically an error handling middleware.
 */
router.get('/applications', [
  check('person_id').isInt().withMessage('userId must be an integer'),

 async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    UserController.getUserApplications(req, res).catch(next);
  }
]);
export default router
