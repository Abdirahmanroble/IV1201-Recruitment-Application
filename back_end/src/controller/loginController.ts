import { type Request, type Response } from "express";
import AuthService from "../services/authService";
import { createToken } from "../middleware/auth.middleware";
/**
 * Controller for person-related operations.
 */
class LoginController {
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
