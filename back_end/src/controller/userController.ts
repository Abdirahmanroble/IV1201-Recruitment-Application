import { type Request, type Response } from "express"
import { ApplicationService } from "../services/applicationService"
import AuthService from "../services/authService"
import { createToken } from "../middleware/auth.middleware"
import UpdateUserService from "../services/updateUserService"
import Logger from "../util/Logger"
import nodemailer from "nodemailer"

interface UserDTO {
  person_id: number
  email: string
  password: string
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
    const { username, password } = req.body

    try {
      const user = await AuthService.login({ username, password })

      if (user === null || user === undefined) {
        res
          .status(401)
          .send({
            message: "Invalid credentials",
            responseCode: 100,
          }) /** Remove later */
        Logger.logException(new Error("Something wrong with the inputs"), {
          file: "UserController.ts",
          reason: "Invalid credentials",
        })
        return
      }
      const needsPasswordUpdate = user.password === null
      const foundUser = {
        person_id: user.person_id,
        name: user.name,
        surname: user.surname,
        pnr: user.pnr,
        email: user.email,
        username: user.username,
        role_id: user.role_id,
      }

      const token = createToken(foundUser.person_id!, foundUser.username)
      res.cookie("jwt", token, { httpOnly: true })
      if (needsPasswordUpdate) {
        res.json({
          message: "Login successful",
          foundUser,
          needsPasswordUpdate,
        })
        Logger.log("info", "Login successful", {
          file: "UserController.ts",
          reason: "User logged in successfully.",
        })
      } else {
        res.json({
          message: "Login successful",
          foundUser,
          needsPasswordUpdate,
        })
        Logger.log("info", "Login successful", {
          file: "UserController.ts",
          reason: "User logged in successfully.",
        })
      }
    } catch (error) {
      res.status(500).send("error logging in")
      Logger.logException(new Error("Something went wrong with the login"), {
        file: "UserController.ts",
        reason: "Login was unsuccessful.",
      })
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
    const userDTO = req.body

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const user = await AuthService.register(userDTO)
      if (user === null || user === undefined) {
        res.status(401).send("Invalid credentials")
        res.status(401).send("Invalid credentials")
        Logger.logException(new Error("Something wrong with the inputs"), {
          file: "UserController.ts",
          reason: "Invalid credentials",
        })
        return
      }
      if (typeof user === "string") {
        res.status(401).send(user)
      } else {
        const createdUser = {
          person_id: user.person_id,
          name: user.name,
          surname: user.surname,
          pnr: user.pnr,
          email: user.email,
          username: user.username,
          role_id: user.role_id,
        }

        const token = createToken(user.person_id!, user.username)
        res.cookie("jwt", token, { httpOnly: true })

        res.json({ message: "Register successful", createdUser })
        Logger.log("info", "Register successful", {
          file: "UserController.ts",
          reason: "User registered successfully.",
        })
      }
    } catch (error) {
      Logger.logException(
        new Error("Something went wrong with the registration"),
        { file: "UserController.ts", reason: "Registration was unsuccessful." }
      )
      res.status(500).send(error)
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
      const applications = await ApplicationService.getAllApplications()
      res.json({ message: "Applications gotten successfully", applications })
      Logger.log("info", "Applications gotten successfully", {
        file: "UserController.ts",
        reason: "Sent all applications",
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message)
      } else {
        res.status(500).send("An unknown error occurred")
        Logger.logException(new Error("An unknown error occurred"), {
          file: "UserController.ts",
          reason: "Error in getting user applications",
        })
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
    const userDTO = req.body
    try {
      const updatedUser = await UpdateUserService.updateUser(userDTO as UserDTO)
      res.json({ message: updatedUser })
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message)
      } else {
        res.status(500).send("An unknown error occurred")
        res.status(500).send("An unknown error occurred")
        Logger.logException(new Error("An unknown error occurred"), {
          file: "UserController.ts",
          reason: "Error in getting user applications",
        })
      }
    }
  }

  /**
   * Sends a password update request email to the user.
   * 
   * @param {Request} req - The express request object containing the email in the body.
   * @param {Response} res - The express response object used to send back a confirmation.
   * @returns {Promise<void>} - A promise that resolves when the email has been sent.
   */
  public static async emailConfirmation(req: Request, res: Response): Promise<void> {
    const email = req.body.email;
    try {
      const user = await UpdateUserService.getUsersByEmail(email);
  
      const testAccount = await nodemailer.createTestAccount();
  
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user, 
          pass: testAccount.pass, 
        },
      })
  
      const token = createToken(user?.person_id!, user?.username!)
      const id = user?.person_id
      const url = `http://localhost:4000/update-password/${token}`
  
      const emailHTML = `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <h2>Password Update Request</h2>
          <p>You (or someone else) have requested to reset your password for your account.</p>
          <p>To update your password, please click on the following link:</p>
          <a href="${url}" style="color: #0066cc;">Update Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `
  
      const info = await transporter.sendMail({
        from: '"Your Company Name" <support@yourcompany.com>',
        to: email,
        subject: "Password Update Request",
        text: "To update your password, please click on the link below.", 
        html: emailHTML, 
      })
  
      const infoMail = {
        from: info.envelope.from,
        to: info.envelope.to[0],
        messageId: info.messageId,
        body: emailHTML
      }
  
      res.send({ message: "Email sent!", url, id, info: infoMail })
    } catch (error) {
      console.error("Email confirmation error:", error);
      res.status(500).send("An error occurred while sending the email.")
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
    res.clearCookie("jwt")
    res.status(200).send("User logged out successfully")
    Logger.log("info", "User has been logged out", {
      file: "UserController.ts",
      reason: "Logged Out",
    })
  }
}
export default UserController
