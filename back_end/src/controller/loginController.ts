import { type Request, type Response } from "express";
import AuthService from "../services/authService";
import { createToken } from "../middleware/auth.middleware";
/**
 * Controller for person-related operations.
 */
class LoginController {
  /**
   * Authenticates a user using provided username and password.
   * If authentication is successful, generates a JWT token for the user and sends it back
   * as an HTTP-only cookie. Responds with the user's details (excluding the password) and
   * a success message. If authentication fails due to invalid credentials, responds with a 401 status.
   * On other errors, sends a 500 status with the error message.
   *
   * @param {Request} req - The Express request object containing the login credentials.
   * @param {Response} res - The Express response object used to send back the response to the client.
   * @returns {Promise<void>} A promise that resolves with no return value, indicating the response has been sent.
   */
  public static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const user = await AuthService.login({ username, password });

      if (user === null || user === undefined) {
        res.status(401).send("Invalid credentials");
        return;
      }
      const foundUser = {
        name: user.name,
        surname: user.surname,
        pnr: user.pnr,
        email: user.email,
        username: user.username,
        role_id: user.role_id,
      };

      const token = createToken(foundUser.email);
      res.cookie("jwt", token, { httpOnly: true });

      res.json({ message: "Login successful", foundUser });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default LoginController;
