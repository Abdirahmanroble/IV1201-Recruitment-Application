
import { Request, Response } from 'express';
import AuthService from '../services/authService';

class PersonController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const user = await AuthService.login({ username, password });

      if (!user) {
        res.status(401).send('Invalid credentials');
        return;
      }
      const foundUser = {
        name: user.name,
        surname: user.surname,
        pnr: user.pnr,
        email: user.email,
        username: user.username,
        role_id: user.role_id
      }
      res.json({ message: 'Login successful', foundUser });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default PersonController;
