/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type Request, type Response } from 'express'
import AuthService from '../services/authService'
import { createToken } from '../middleware/auth.middleware'
/**
 * Controller for person-related operations.
 */
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class UserController {
  /**
   * Handles login requests. Authenticates a user based on username and password. Security will be added in the second sprint.
   * If authentication is successful, responds with the user's details. Otherwise, returns an error.
   *
   * @param {Request} req - Express request object, expected to contain `username` and `password` in the body.
   * @param {Response} res - Express response object used to send back the login status.
   * @returns {Promise<void>} - A promise that resolves with no value.
   */
  public static async login (req: Request, res: Response): Promise<void> {
    const { username, password } = req.body

    try {
      const user = await AuthService.login({ username, password })

      if (user === null || user === undefined) {
        res.status(401).send('Invalid credentials')
        return
      }
      const foundUser = {
        name: user.name,
        surname: user.surname,
        pnr: user.pnr,
        email: user.email,
        username: user.username,
        role_id: user.role_id
      }

      const token = createToken(foundUser.email)
      res.cookie('jwt', token, { httpOnly: true })

      res.json({ message: 'Login successful', foundUser })
    } catch (error) {
      res.status(500).send(error)
    }
  }

  public static async register (req: Request, res: Response): Promise<void> {
    const userDTO = req.body

    try {
      const user = await AuthService.register(userDTO)
      if (user === null || user === undefined) {
        res.status(401).send('Invalid credentials')
        return
      }
      if (typeof user === 'string') {
        // Check if user is a string (error message)
        res.status(401).send(user)
      } else {
        const createdUser = {
          person_id: user.person_id,
          name: user.name,
          surname: user.surname,
          pnr: user.pnr,
          email: user.email,
          username: user.username,
          role_id: user.role_id
        }

        const token = createToken(createdUser.email)
        res.cookie('jwt', token, { httpOnly: true })

        res.json({ message: 'Register successful', createdUser })
      }
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

export default UserController
