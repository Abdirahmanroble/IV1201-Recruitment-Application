import { type Request, type Response } from "express";
import { ApplicationService } from "../services/applicationService";
import AuthService from "../services/authService";
import { createToken } from "../middleware/auth.middleware";
import UpdateUserService from "../services/updateUserService";

interface UserDTO {
  person_id: number;
  email: string;
  password: string;
}
/**
 * Controller for user-related operations in an Express application.
 * Provides static methods for handling login, registration, fetching user applications, and logout functionalities.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class UserController {
  /**
   * Handles user login requests. Authenticates the user with provided credentials,
   * and on successful authentication, returns the user's details along with a JWT token.
   * If authentication fails, responds with an appropriate error message.
   *
   * @param {Request} req - The Express request object containing login credentials.
   * @param {Response} res - The Express response object used for sending back the login response.
   * @returns {Promise<void>} A promise that resolves with no return value.
   */
  public static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const user = await AuthService.login({ username, password });

      if (user === null || user === undefined) {
        res.status(401).send("Invalid credentials");
        return;
      }
      const needsPasswordUpdate = user.password === null;
      const foundUser = {
        person_id: user.person_id,
        name: user.name,
        surname: user.surname,
        pnr: user.pnr,
        email: user.email,
        username: user.username,
        role_id: user.role_id,
      };

      const token = createToken(foundUser.email);
      res.cookie("jwt", token, { httpOnly: true });
      if (needsPasswordUpdate) {
        res.json({ message: "Login successful", foundUser, needsPasswordUpdate });
      } else {
        res.json({ message: "Login successful", foundUser, needsPasswordUpdate });
      }
    } catch (error) {
      res.status(500).send("error logging in");
    }
  }

  /**
   * Handles user registration requests. Registers a new user with the provided details
   * and returns the newly created user's details along with a JWT token.
   * If registration fails, responds with an appropriate error message.
   *
   * @param {Request} req - The Express request object containing user registration details.
   * @param {Response} res - The Express response object used for sending back the registration response.
   * @returns {Promise<void>} A promise that resolves with no return value.
   */
  public static async register(req: Request, res: Response): Promise<void> {
    const userDTO = req.body;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const user = await AuthService.register(userDTO);
      if (user === null || user === undefined) {
        res.status(401).send("Invalid credentials");
        return;
      }
      if (typeof user === "string") {
        res.status(401).send(user);
      } else {
        const createdUser = {
          person_id: user.person_id,
          name: user.name,
          surname: user.surname,
          pnr: user.pnr,
          email: user.email,
          username: user.username,
          role_id: user.role_id,
        };

        const token = createToken(createdUser.email);
        res.cookie("jwt", token, { httpOnly: true });

        res.json({ message: "Register successful", createdUser });
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }

  /**
   * Retrieves and sends all applications associated with the user.
   * Requires authentication and appropriate user permissions.
   *
   * @param {Request} req - The Express request object, potentially containing filters or identifiers.
   * @param {Response} res - The Express response object used for sending back the applications.
   * @returns {Promise<void>} A promise that resolves with no return value, sending the applications in the response.
   */
  public static async getUserApplications(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const applications = await ApplicationService.getAllApplications();
      res.json({ message: "Applications gotten successfully", applications });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("An unknown error occurred");
      }
    }
  }

  /**
   * Updates a user's email and password. If the user has no password, it hashes and updates it.
   * If the user has an email, it updates it.
   *
   * @param {Request} req - The Express request object containing the updated user details.
   * @param {Response} res - The Express response object used for sending back the update confirmation.
   * @returns {Promise<void>} A promise that resolves with no return value.
   */
  public static async updateUser(req: Request, res: Response): Promise<void> {
    const userDTO = req.body;
    try {
      const updatedUser = await UpdateUserService.updateUser(
        userDTO as UserDTO
      );
      res.json({ message: updatedUser });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send("An unknown error occurred");
      }
    }
  }

  /**
   * Handles user logout requests. Clears the JWT token cookie, effectively logging the user out.
   *
   * @param {Request} req - The Express request object, not used in this method but required for consistency.
   * @param {Response} res - The Express response object used for sending back the logout confirmation.
   * @param {NextFunction} next - The next middleware function in the Express request-response cycle.
   * @returns {Promise<void>} A promise that resolves with no return value.
   */
  public static async logout(res: Response): Promise<void> {
    res.clearCookie("jwt");
    res.status(200).send("User logged out successfully");
  }
}
export default UserController;
